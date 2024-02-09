"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

export default function RegionDetail() {
  const [regionDetail, setRegionDetail] = useState(null);
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const regionName = usePathname().match(/\/region\/([^\/]+)(?:\/|$)/)[1];

  const getRegionDetail = async () => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/region/slug/${regionName}`
      );
      if (res.status === 200) {
        const regionData = res.data?.data;

        if (regionData.length > 0) {
          setRegionDetail(regionData[0]);
        }
        setPageLevelLoader(false);
      } else {
        setPageLevelLoader(false);
      }
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };
  console.log(regionDetail);
  useEffect(() => {
    getRegionDetail();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={true} />
      ) : (
        <>
          {regionDetail && (
            <div>
              <div>
                <Image
                  src={regionDetail?.imgUrl}
                  height={500}
                  width={1512}
                  alt={`${regionDetail?.name}-image`}
                />
                <h4>Explore {regionDetail?.name}</h4>
              </div>
              <div>
                <h4>{regionDetail?.name}</h4>
                <p>{regionDetail?.description}</p>
              </div>
              <div></div>
            </div>
          )}
        </>
      )}
    </>
  );
}
