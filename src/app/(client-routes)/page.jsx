"use client";
import PackageCard from "@/components/PackageCard";
import "../scss/_home.scss";
import "material-icons/iconfont/material-icons.css";
import image from "../../../public/images/km.png";
import Notification from "@/components/Notification";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { averageReview } from "@/utils/functions";
import HomeTest from "@/components/HomeTest";
import { GlobalContext } from "@/context";

export default function Home() {
  const {
    callExtractAll,
    setCallExtractAll,
    setPageLevelLoader,
    pageLevelLoader,
    homePageEdit,
    setHomePageEdit,
    setDialogOpen,
    dialogContent,
    setDialogContent,
  } = useContext(GlobalContext);
  const [homePageData, setHomePageData] = useState(null);
  const getHomePageDetail = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/homepage/`
      );
      if (res.status === 200) {
        setPageLevelLoader(false);
        setHomePageData(res.data);
      }
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    getHomePageDetail();
  }, [callExtractAll]);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={true} />
      ) : (
        <HomeTest homePageData={homePageData} />
      )}
    </>
  );
}
