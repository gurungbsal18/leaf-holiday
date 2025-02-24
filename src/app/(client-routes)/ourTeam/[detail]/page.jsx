"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/utils/axios";

export default function TeamDetail() {
  const [teamDetail, setTeamDetail] = useState(null);
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const teamName = usePathname().match(/\/ourTeam\/([^\/]+)(?:\/|$)/)[1];

  const getTeamDetail = async () => {
    try {
      const res = await axios(`/ourTeam/slug/${teamName}`);
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
              <div className="team-hero-img">
                <Image
                  src="/images/km.png"
                  height={500}
                  width={1512}
                  alt={`team-image`}
                />
              </div>
              <div className="container my-5">
                <div className="row">
                  <div className="col-12 col-md-3">
                    <div className="team-card">
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
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: teamDetail?.content,
                  }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
