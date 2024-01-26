import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";

export default function ItineriesContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <div className="d-flex">
        <Image src={content?.imageUrl} width={25} height={25} />
        <p>{content?.title}</p>
      </div>
      <p>{content?.maxAltitude}</p>
      <p>{content?.meals}</p>
      <p>{content?.accomodation}</p>
    </div>
  );
}
