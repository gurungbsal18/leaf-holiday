"use client";
import React, { useState } from "react";
import PackageCard from "../PackageCard";

const ExploreDestination = ({ middleTabData }) => {
  const [activeExploreBtn, setActiveExploreBtn] = useState(
    middleTabData ? middleTabData[0]?._id : ""
  );
  const [middleTabIndex, setMiddleTabIndex] = useState(0);
  console.log("middle tab data: ", middleTabData);

  return (
    <>
      {middleTabData && (
        <div className="container py-100">
          <div className="text-center my-5">
            <h2 className="home-title">Explore More Destination</h2>
            <p className="m-0">Find things to do in different areas</p>
          </div>

          <div className="explore-section-btn d-flex justify-content-center gap-2">
            {middleTabData.map((item, index) => (
              <button
                className={`btn ${
                  activeExploreBtn === item._id
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={() => {
                  setActiveExploreBtn(item._id);
                  setMiddleTabIndex(index);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="d-flex gap-3 flex-wrap">
            {middleTabData[middleTabIndex]?.packages?.map((item) => (
              <PackageCard packageDetail={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreDestination;
