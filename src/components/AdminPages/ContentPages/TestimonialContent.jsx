import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";

export default function TestimonialContent({ content }) {
  console.log(content);
  return (
    <div className="d-flex gap-3">
      <p>{content?.userID.name}</p>
      <p>{content?.comment}</p>
      <Rating value={content?.stars | 0} readOnly />
      <p>{content?.packageId?.name}</p>
      <p>{dayjs(content?.date).format("ddd MMM DD, YYYY")}</p>
    </div>
  );
}
