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
            <h4 className="title fw-bold">Admin Dashboard</h4>
          </div>
          <div className="row mt-4">
            {dashboardData &&
              Object.entries(dashboardData).map(([key, value]) => (
                <div className="col-3" key={key}>
                  <div className="d-flex py-3 bg-success-subtle rounded flex-column-reverse justify-content-center align-items-center">
                    <div className="d-flex justify-content-center flex-column align-items-center py-2">
                      <p>{adminDataMapper[key]?.label}</p>
                      <h1 className="title text-success">{value}</h1>
                      <Link href={`/admin/${adminDataMapper[key]?.path}`}>
                        <button className="btn btn-sm btn-success">{`View All ${adminDataMapper[key]?.label}`}</button>
                      </Link>
                    </div>
                    <div className="text-success">
                      {adminDataMapper[key]?.icon}
                    </div>
                  </div>
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
