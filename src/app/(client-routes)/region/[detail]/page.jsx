"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "@/utils/axios";

export default function RegionDetail() {
  const [regionDetail, setRegionDetail] = useState(null);
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const regionName = usePathname().match(/\/region\/([^\/]+)(?:\/|$)/)[1];

  const getRegionDetail = async () => {
    try {
      const res = await axios(`/region/slug/${regionName}`);
      if (res.status === 200) {
        const regionData = res.data?.data;

        if (regionData.length > 0) {
          setRegionDetail(regionData[0]);
        }
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong. Please Try Again...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }
  };
  regionDetail;
  useEffect(() => {
    getRegionDetail();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
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
