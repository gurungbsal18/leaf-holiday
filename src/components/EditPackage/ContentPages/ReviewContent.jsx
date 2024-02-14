import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";

export default function ReviewContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <p>{content?.userID.name}</p>
      <p>{content?.comment}</p>
      <Rating value={content?.stars | 0} readOnly />
    </div>
  );
}
