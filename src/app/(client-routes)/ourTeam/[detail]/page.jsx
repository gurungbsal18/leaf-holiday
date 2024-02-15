"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

export default function TeamDetail() {
  const [teamDetail, setTeamDetail] = useState(null);
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const teamName = usePathname().match(/\/ourTeam\/([^\/]+)(?:\/|$)/)[1];

  const getTeamDetail = async () => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ourTeam/slug/${teamName}`
      );
      if (res.status === 200) {
        const teamData = res.data?.data;

        if (teamData.length > 0) {
          setTeamDetail(teamData[0]);
        }
        setPageLevelLoader(false);
      } else {
        setPageLevelLoader(false);
      }
    } catch (e) {
      e;
      setPageLevelLoader(false);
    }
  };
  teamDetail;
  useEffect(() => {
    getTeamDetail();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <>
          {teamDetail && (
            <div>
              <div>
                <Image
                  src="/images/km.png"
                  height={500}
                  width={1512}
                  alt={`team-image`}
                />
              </div>
              <div>
                <div className="d-flex">
                  <Image
                    src={teamDetail?.imageUrl}
                    width={150}
                    height={200}
                    alt="member-image"
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <h4>{teamDetail?.name}</h4>
                    <p>{teamDetail?.designation}</p>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: teamDetail?.content,
                  }}></div>
              </div>
              <div></div>
            </div>
          )}
        </>
      )}
    </>
  );
}
