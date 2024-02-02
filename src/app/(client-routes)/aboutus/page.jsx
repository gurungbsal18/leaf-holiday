"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import Image from "next/image";
import Carousel from "@/components/Carousel";

export default function AboutUs() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [aboutUsData, setAboutUsData] = useState(null);
  const [navigationData, setNavigationData] = useState("ourStory");
  const [showDocument, setShowDocument] = useState([]);

  //helper array to map the similar fields
  const aboutUsNavigation = [
    {
      label: "Our Story",
      name: "ourStory",
    },
    {
      label: "Our Mission",
      name: "ourMission",
    },
    {
      label: "Our Services",
      name: "ourService",
    },
    {
      label: "Why Leaf Holiday?",
      name: "whyLeaf",
    },
    {
      label: "Conclusion",
      name: "conclusion",
    },
  ];

  const getData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/aboutUs/`
      );

      if (res?.data?.data?.length > 0) {
        setAboutUsData(res.data.data[0]);
        setPageLevelLoader(false);
      } else {
        toast.error("No About Us Data Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(e.response.statusText, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }
  };

  //get data from the server on mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : aboutUsData ? (
        <div>
          <div>
            <Image src={aboutUsData.imageUrl} width={1024} height={500} />
          </div>
          <div>
            <div>
              <h1>About Us</h1>
              <div
                dangerouslySetInnerHTML={{ __html: aboutUsData.aboutUs }}></div>
            </div>
            <div>
              <div className="d-flex">
                {aboutUsNavigation.map((item) => (
                  <p
                    className={`border border-success p-3 pt-0 pb-0 ${
                      item.name === navigationData
                        ? "bg-success text-bg-light "
                        : "bg-white text-success"
                    }`}
                    onClick={() => setNavigationData(item.name)}>
                    {item.label}
                  </p>
                ))}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: aboutUsData[navigationData],
                }}></div>
            </div>
          </div>
          <div>
            <h1>Company Documents</h1>
            <div>
              <div>
                <Carousel images={aboutUsData.document} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-danger">No About Us Data Found</h1>
          <p className="text-danger">Please Contact the Admin to Add Data</p>
        </div>
      )}
    </>
  );
}
