"use client";
import React, { useState } from "react";

const ExploreDestination = () => {
  const [activeExploreBtn, setActiveExploreBtn] = useState("Kailash Tour");

  return (
    <div className="container py-100">
      <div className="text-center my-5">
        <h2 className="home-title">Explore More Destination</h2>
        <p className="m-0">Find things to do in different areas</p>
      </div>

      <div className="explore-section-btn d-flex justify-content-center gap-2">
        <button
          className={`btn ${
            activeExploreBtn === "Kailash Tour"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() => setActiveExploreBtn("Kailash Tour")}
        >
          Kailash Tour
        </button>
        <button
          className={`btn ${
            activeExploreBtn === "Everest Tour"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() => setActiveExploreBtn("Everest Tour")}
        >
          Everest Region
        </button>
        <button
          className={`btn ${
            activeExploreBtn === "Annapurna Tour"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() => setActiveExploreBtn("Annapurna Tour")}
        >
          Annapurna Region
        </button>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-success">
          Explore Kailash Tour Packages
        </button>
      </div>
    </div>
  );
};

export default ExploreDestination;
