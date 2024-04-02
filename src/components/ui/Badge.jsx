import React from "react";

export default function Badge({ name }) {
  return (
    <>
      {name === "groupTour" && (
        <div className="badge text-bg-success group-tour-badge">Group Tour</div>
      )}
      <div className="d-flex badge-group gap-2">
        {name === "featured" && (
          <div className="badge text-bg-info feature-badge">Featured</div>
        )}
        {name === "trending" && (
          <div className="badge text-bg-warning trending-badge">Trending</div>
        )}
        {name === "topSelling" && (
          <div className="badge text-bg-danger top-selling-badge">
            Top Selling
          </div>
        )}
      </div>
    </>
  );
}
