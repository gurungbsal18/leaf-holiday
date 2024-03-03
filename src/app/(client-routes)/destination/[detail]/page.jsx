"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/utils/axios";

export default function DestinationDetail() {
  const [destinationDetail, setDestinationDetail] = useState(null);
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const destinationName = usePathname().match(
    /\/destination\/([^\/]+)(?:\/|$)/
  )[1];

  const getDestinationDetail = async () => {
    try {
      const res = await axios(`/destination/slug/${destinationName}`);
      if (res.status === 200) {
        const destinationData = res.data?.data;

        if (destinationData.length > 0) {
          setDestinationDetail(destinationData[0]);
        }
        setPageLevelLoader(false);
      } else {
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  };
  console.log(destinationDetail);
  useEffect(() => {
    getDestinationDetail();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <>
          {destinationDetail && (
            <div>
              <div>
                <Image
                  src={destinationDetail?.imageUrl}
                  height={500}
                  width={1512}
                  alt={`${destinationDetail?.name}-image`}
                />
                <h4>Explore {destinationDetail?.name}</h4>
              </div>
              <div>
                <h4>{destinationDetail?.name}</h4>
                <p>{destinationDetail?.description}</p>
              </div>
              <div></div>
            </div>
          )}
        </>
      )}
    </>
  );
}
