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
          <div className="header-image">
            <Image
              src="/images/km.png"
              width={1511}
              height={500}
              alt="our-team-header"
            />
          </div>
          <div className="container my-5">
            <h4 className="title fw-bold text-center">Meet Our Team</h4>
            <p className="text-muted text-center mb-5">
              We are a group of dedicated professionals united by our passion
              for the outdoors and a shared commitment to global exploration.
              Within our team, we have individuals devoted to operations,
              finance, and sales, whose professionalism has enabled Himalayan
              Glacier to consistently deliver top-tier services to our
              clientele. Our team comprises nature enthusiasts who are fervently
              dedicated to global travel. Over nearly thirty years, we have
              continuously expanded our offerings, introducing fresh and
              distinctive destinations and itineraries tailored to exceed the
              expectations of our clients.
            </p>
            <div className="row">
              {ourTeamData &&
                ourTeamData.map((item) => (
                  <TeamCard key={item._id} teamDetail={item} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
