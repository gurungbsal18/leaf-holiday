"use client";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

function PackageCard({
  imageUrl,
  address,
  rating,
  noOfReviews,
  title,
  duration,
  price,
}) {
  return (
    <div className="trip-card border col-3">
      <Image src={imageUrl} height={200} width={350} alt="package-image" />
      <div className="trip-card-body p-3 d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted trip-card-location d-flex align-items-center gap-1">
            <FmdGoodOutlinedIcon />
            {address}
          </span>
          <span className="trip-card-review d-flex align-items-center gap-2 text-muted">
            <Rating value={rating} precision={0.5} readOnly />
            {noOfReviews} Reviews
          </span>
        </div>
        <h4 className="trip-card-title">{title}</h4>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted trip-card-duration d-flex align-items-center gap-1">
            <ScheduleOutlinedIcon fontSize="14" />
            {duration} Days
          </span>
          <p className="m-0">
            USD {price}/
            <span className="text-muted" style={{ fontSize: "12px" }}>
              per person
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
