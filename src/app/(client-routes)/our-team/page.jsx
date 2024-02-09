"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function OurTeam() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [ourTeamData, setOurTeamData] = useState(null);
  const getOurTeamData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ourTeam/`
      );
      if (res.status === 200) {
        const ourTeam = res.data?.data;
        if (ourTeam.length > 0) {
          setOurTeamData(ourTeam);
        }
        setPageLevelLoader(false);
      } else {
        setPageLevelLoader(false);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };
  console.log("our team data:", ourTeamData);
  useEffect(() => {
    getOurTeamData();
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={true} />
      ) : (
        <div>
          <h4>Our Team</h4>
        </div>
      )}
    </>
  );
}
