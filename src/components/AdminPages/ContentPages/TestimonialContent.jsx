import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";

export default function TestimonialContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <p style={{ width: "150px" }}>{content?.userID.name}</p>
      <p style={{ width: "150px" }}>{content?.comment}</p>
      <Rating value={content?.stars | 0} readOnly />
      <p style={{ width: "150px" }}>{content?.packageId?.name}</p>
      <p style={{ width: "150px" }}>
        {dayjs(content?.date).format("ddd MMM DD, YYYY")}
      </p>
    </div>
  );
}
