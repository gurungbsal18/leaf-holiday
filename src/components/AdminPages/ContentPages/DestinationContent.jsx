import React from "react";
import Image from "next/image";

export default function DestinationContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <div className="d-flex">
        <Image
          src={content?.imageUrl}
          width={25}
          height={25}
          alt="package-image"
        />
        <p style={{ width: "150px" }}>{content?.name}</p>
      </div>
      <p style={{ width: "150px" }}>{content?.description}</p>
    </div>
  );
}
