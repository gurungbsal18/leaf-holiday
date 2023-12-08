"use client";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Rating from "@mui/material/Rating";
import Image from "next/image";

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
    <div className="cart w-25">
      <Image src={imageUrl} height={200} width={350} alt="package-image" />
      <div className="d-flex justify-content-between ">
        <span>
          <LocationOnIcon />
          {address}
        </span>
        <span>
          <Rating value={rating} precision={0.5} readOnly />
          {noOfReviews} Reviews
        </span>
      </div>
      <h2>{title}</h2>
      <div className="d-flex justify-content-between ">
        <span>
          <CalendarMonthIcon />
          {duration} Days
        </span>
        <p>US${price}/per person</p>
      </div>
    </div>
  );
}

export default PackageCard;
