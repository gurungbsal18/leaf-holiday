"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import { useContext, useEffect, useState } from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import ArticleIcon from "@mui/icons-material/Article";
import Link from "next/link";

export default function AdminDashboard() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [dashboardData, setDashboardData] = useState(null);
  const getDashboardData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get("/homepage/dashboard");
      console.log(res);
      if (res.status === 200) {
        setDashboardData(res?.data);
        setPageLevelLoader(false);
      } else {
        setPageLevelLoader(false);
      }
    } catch (e) {
      console.log(
        e?.response?.data?.error || "Something went wrong. Please try again !!!"
      );
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getDashboardData();
    }, 1000);
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="dashboard-content-section p-4">
          <div>
            <h2>Admin Dashboard</h2>
          </div>
          <div className="d-flex gap-5">
            {dashboardData &&
              Object.entries(dashboardData).map(([key, value]) => (
                <div key={key} className="d-flex">
                  <div>
                    <p>{adminDataMapper[key]?.label}</p>
                    <h4>{value}</h4>
                    <Link
                      href={`/admin/${adminDataMapper[key]?.path}`}>{`View All ${adminDataMapper[key]?.label}`}</Link>
                  </div>
                  <div>{adminDataMapper[key]?.icon}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
const adminDataMapper = {
  packageCount: {
    id: "packages",
    icon: <AirplanemodeActiveIcon />,
    label: "Packages",
    path: "packages",
  },
  destinationCount: {
    id: "destination",
    icon: <LocationOnIcon />,
    label: "Destinations",
    path: "destination",
  },
  regionCount: {
    id: "regions",
    icon: <MapIcon />,
    label: "Regions",
    path: "regions",
  },
  blogCount: {
    id: "blogs",
    icon: <ArticleIcon />,
    label: "Blogs",
    path: "blogs",
  },
};
