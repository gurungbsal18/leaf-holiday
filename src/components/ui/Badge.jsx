import React from "react";

export default function Badge({ name }) {
  return (
    <>
      {name === "featured" && <div className="feature-badge">Featured</div>}
      {name === "groupTour" && (
        <div className="group-tour-badge">Group Tour</div>
      )}
      {name === "trending" && <div className="trending-badge">Trendingg</div>}
      {name === "topSelling" && (
        <div className="top-selling-badge">Top Selling</div>
      )}
    </>
  );
}
