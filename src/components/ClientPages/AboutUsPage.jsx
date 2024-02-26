"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import Image from "next/image";
import Fancybox from "@/components/FancyappWrapper";
import axios from "@/utils/axios";

export default function AboutUsPage({ aboutUsData }) {
  const [navigationData, setNavigationData] = useState("ourStory");

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

  return (
    <div>
      <div className="common-banner">
        <Image
          src={aboutUsData.imageUrl}
          width={1024}
          height={500}
          alt="about-us-header-image"
        />
      </div>
      <div className="container">
        <div>
          <div className="pt-100">
            <h4 className="title fw-bold">About Us</h4>
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{
                __html: aboutUsData.aboutUs,
              }}></div>
          </div>
          <div className="pt-100">
            <div className="d-flex mb-3 gap-2 border-bottom pb-3">
              {aboutUsNavigation.map((item) => (
                <button
                  key={item.name}
                  className={`btn btn-md border border-success ${
                    item.name === navigationData
                      ? "bg-success text-light "
                      : "bg-white text-success"
                  }`}
                  onClick={() => setNavigationData(item.name)}>
                  {item.label}
                </button>
              ))}
            </div>
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{
                __html: aboutUsData[navigationData],
              }}></div>
          </div>
        </div>
        <div className="pt-100 pb-5">
          <h4 className="title fw-bold">Company Documents</h4>
          <div>
            <div>
              <Fancybox
                options={{
                  Carousel: {
                    infinite: false,
                  },
                }}>
                {aboutUsData.document.map((item) => (
                  <a data-fancybox="gallery" href={item} key={item}>
                    <Image
                      src={item}
                      height={200}
                      width={200}
                      alt="document-image"
                    />
                  </a>
                ))}
              </Fancybox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
