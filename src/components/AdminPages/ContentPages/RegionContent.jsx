import React from "react";
import Image from "next/image";

export default function RegionContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <div className="d-flex">
        {/* <Image
          src={content?.imgUrl}
          width={25}
          height={25}
          alt="package-image"
        /> */}
        <p style={{ width: "250px" }}>{content?.name}</p>
      </div>
      <p style={{ width: "150px" }}>{content?.description}</p>
      <p style={{ width: "150px" }}>{content?.destination?.name}</p>
    </div>
  );
}
