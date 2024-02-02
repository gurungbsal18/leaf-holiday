"use client";
import PackageCard from "@/components/PackageCard";
import "../scss/_home.scss";
import "material-icons/iconfont/material-icons.css";
import image from "../../../public/images/km.png";
import Notification from "@/components/Notification";
import axios from "axios";
import { useEffect, useState } from "react";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { averageReview } from "@/utils/functions";
import HomeTest from "@/components/HomeTest";

export default function Home() {
  const [packageData, setPackageData] = useState(null);

  const extractAllPackages = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/package/`
    );
    setPackageData(res.data.data);
  };
  useEffect(() => {
    extractAllPackages();
  }, []);

  return (
    <>
      <HomeTest />
      {packageData ? (
        <div className="container">
          <h1>leaf holiday</h1>
          <div className="d-flex flex-wrap gap-4">
            {packageData.map((item) => (
              <PackageCard packageDetail={item} />
            ))}
          </div>
        </div>
      ) : (
        <PageLevelLoader loading={true} />
      )}
    </>
  );
}
