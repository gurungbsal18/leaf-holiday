import React from "react";
import GroupsSharpIcon from "@mui/icons-material/GroupsSharp";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import FlashOnSharpIcon from "@mui/icons-material/FlashOnSharp";
import VolunteerActivismSharpIcon from "@mui/icons-material/VolunteerActivismSharp";

export default function Badge({ name }) {
  return (
    <>
      {name === "groupTour" && (
        <div className="badge text-bg-success group-tour-badge d-flex align-items-center">
          <GroupsSharpIcon className="me-1" />
          Group Discount
        </div>
      )}
      <div className="d-flex badge-group gap-2">
        {name === "featured" && (
          <div className="badge text-bg-primary feature-badge d-flex align-items-center">
            <StarsSharpIcon className="me-1" />
            Featured
          </div>
        )}
        {name === "trending" && (
          <div className="badge text-bg-warning trending-badge d-flex align-items-center">
            <FlashOnSharpIcon className="me-1" />
            Trending
          </div>
        )}
        {name === "topSelling" && (
          <div className="badge text-bg-danger top-selling-badge d-flex align-items-center">
            <VolunteerActivismSharpIcon className="me-1" />
            Top Selling
          </div>
        )}
      </div>
    </>
  );
}
