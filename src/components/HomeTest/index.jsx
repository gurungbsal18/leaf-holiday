"use client";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ExploreDestination from "./ExploreDestination";
import PackageCard from "../PackageCard";
import BlogCard from "../BlogCard";
import ReviewCarousel from "../ReviewCarousel";

const HomeTest = ({ homePageData }) => {
  return (
    <>
      <div className="hero-section">
        <div className="d-flex justify-content-center align-items-center">
          <h1>Kailash Mansarovar Yatra</h1>
        </div>
      </div>
      <div className="hero-search-bar d-flex jusitify-content-center mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search your next adventure"
        />
        <button className="search-btn btn btn-sm btn-success">
          <SearchOutlinedIcon />
          Search
        </button>
      </div>

      {homePageData?.tabs?.top?.length > 0 && (
        <div className="py-100">
          <div className="container">
            <div className="text-center my-5">
              <h4 className="home-title">
                {homePageData?.tabs?.top[0]?.title}
              </h4>
            </div>
            <div className="d-flex gap-3 flex-wrap">
              {homePageData?.tabs?.top[0]?.packages?.map((item) => (
                <PackageCard packageDetail={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {homePageData?.tabs?.middle?.length > 0 && (
        <ExploreDestination middleTabData={homePageData?.tabs?.middle} />
      )}

      {homePageData?.tabs?.bottom?.length > 0 && (
        <div className="py-100">
          <div className="container">
            <div className="text-center my-5">
              <h2 className="home-title">
                {homePageData?.tabs?.bottom[0]?.title}
              </h2>
            </div>

            <div className="home-video-section d-flex flex-column flex-lg-row gap-3">
              <div className="col-12 col-lg-6">
                {homePageData?.tabs?.bottom[0]?.videoUrl && (
                  // <iframe
                  //   width="560"
                  //   height="315"
                  //   src={homePageData?.tabs?.bottom[0]?.videoUrl}
                  //   title="YouTube video player"
                  //   frameborder="0"
                  //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  //   allowfullscreen
                  // ></iframe>
                  <iframe
                    width="853"
                    height="480"
                    src="https://www.youtube.com/embed/m-M1AtrxztU"
                    title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}
              </div>
              <div className="col-12 col-lg-6">
                <div className="d-flex gap-3 flex-wrap">
                  {homePageData?.tabs?.bottom[0]?.packages?.map((item) => (
                    <PackageCard packageDetail={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {homePageData?.blogs?.length > 0 && (
        <div className="container blog-section py-100">
          <div className="text-center">
            <h2 className="home-title">Blogs and News</h2>
          </div>
          <div>
            {homePageData?.blogs?.map((item) => (
              <BlogCard blogDetail={item} />
            ))}
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn btn-success">View all</button>
          </div>
        </div>
      )}

      <div className="container reccommended-section py-100">
        <div className="text-center my-5">
          <h2 className="home-title">Reccommended on</h2>
        </div>

        <div className="d-flex justify-content-center">
          <img src="/images/TestImages/tripadvisor.png" alt="" />
        </div>
      </div>

      {homePageData?.reviews?.length > 0 && (
        <div>
          <div>
            <h2 className="home-title">Review from our guests</h2>
          </div>
          <ReviewCarousel reviews={homePageData?.reviews} />
        </div>
      )}
    </>
  );
};

export default HomeTest;
