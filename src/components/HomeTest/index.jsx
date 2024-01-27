"use client";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ExploreDestination from "./ExploreDestination";

const HomeTest = () => {
  const TopSellingPackage = [
    {
      imageUrl: "/images/TestImages/ebc-lhasa.jpeg",
      location: "Lhasa",
      review: 5,
      title: "Lhasa, EBC and Mt. Kailash Tour",
      days: 19,
      price: 3950,
    },
    {
      imageUrl: "/images/TestImages/kailash-via-lhasa.jpeg",
      location: "Nepal, Tibet, Lhasa",
      review: 5,
      title: "Kailash via Lhasa In Kerung Out",
      days: 14,
      price: 3750,
    },
    {
      imageUrl: "/images/TestImages/kailash-overland-tour.jpeg",
      location: "Nepal, Tibet, Lhasa",
      review: 5,
      title: "Mount Kailash Overland Tour",
      days: 13,
      price: 2650,
    },
  ];

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

      <div className="container py-100">
        <div className="text-center my-5">
          <h4 className="home-title">Top Selling Packages</h4>
        </div>
        <div className="d-flex gap-3 flex-wrap">
          {TopSellingPackage.map((tripCard, index) => (
            <div key={index}>
              <div className="trip-card border">
                <Image
                  src={tripCard.imageUrl}
                  height={200}
                  width={350}
                  alt="package-image"
                />
                <div className="trip-card-body p-3 d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted trip-card-location d-flex align-items-center gap-1">
                      <FmdGoodOutlinedIcon />
                      {tripCard.location}
                    </span>
                    <span className="trip-card-review d-flex align-items-center gap-2 text-muted">
                      <Rating
                        value={tripCard.review}
                        precision={0.5}
                        readOnly
                      />
                      {tripCard.review} Reviews
                    </span>
                  </div>
                  <h4 className="trip-card-title">{tripCard.title}</h4>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted trip-card-duration d-flex align-items-center gap-1">
                      <ScheduleOutlinedIcon fontSize="14" />
                      {tripCard.days} Days
                    </span>
                    <p className="m-0">
                      USD {tripCard.price}/
                      <span className="text-muted" style={{ fontSize: "12px" }}>
                        per person
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ExploreDestination />

      <div className="container py-100">
        <div className="text-center my-5">
          <h2 className="home-title">Best Of Kailash Tour</h2>
        </div>

        <div className="home-video-section d-flex gap-3">
          <div className="col-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FXncx9XulCw?si=yAlx0fQQXCDtkjSH"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-6">
            <div className="d-flex gap-3 flex-wrap">
              {TopSellingPackage.map((tripCard, index) => (
                <div key={index}>
                  <div className="trip-card border col-6">
                    <Image
                      src={tripCard.imageUrl}
                      height={200}
                      width={350}
                      alt="package-image"
                    />
                    <div className="trip-card-body p-3 d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted trip-card-location d-flex align-items-center gap-1">
                          <FmdGoodOutlinedIcon />
                          {tripCard.location}
                        </span>
                        <span className="trip-card-review d-flex align-items-center gap-2 text-muted">
                          <Rating
                            value={tripCard.review}
                            precision={0.5}
                            readOnly
                          />
                          {tripCard.review} Reviews
                        </span>
                      </div>
                      <h4 className="trip-card-title">{tripCard.title}</h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted trip-card-duration d-flex align-items-center gap-1">
                          <ScheduleOutlinedIcon fontSize="14" />
                          {tripCard.days} Days
                        </span>
                        <p className="m-0">
                          USD {tripCard.price}/
                          <span
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            per person
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container blog-section py-100">
          <div className="text-center">
            <h2 className="home-title">Blogs and News</h2>
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn btn-success">View all</button>
          </div>
        </div>
      </div>

      <div className="container reccommended-section py-100">
        <div className="text-center my-5">
          <h2 className="home-title">Reccommended on</h2>
        </div>

        <div className="d-flex justify-content-center">
          <img src="/images/TestImages/tripadvisor.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default HomeTest;
