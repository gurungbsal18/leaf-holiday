"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import TeamCard from "@/components/TeamCard";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export default function OurTeam() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [ourTeamData, setOurTeamData] = useState(null);
  const getOurTeamData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/ourTeam/`);
      if (res.status === 200) {
        const ourTeam = res.data?.data;
        if (ourTeam.length > 0) {
          setOurTeamData(ourTeam);
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
  useEffect(() => {
    getOurTeamData();
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div>
          <div>
            <Image
              src="/images/km.png"
              width={1511}
              height={500}
              alt="our-team-header"
            />
            <h4>Our Team</h4>
          </div>
          <div className="d-flex">
            {ourTeamData &&
              ourTeamData.map((item) => (
                <TeamCard key={item._id} teamDetail={item} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
