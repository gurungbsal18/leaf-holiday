import React from "react";
import Image from "next/image";

export default function RegionContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <div className="d-flex">
        <Image
          src={content?.imgUrl}
          width={25}
          height={25}
          alt="package-image"
        />
        <p>{content?.name}</p>
      </div>
      <p>{content?.description}</p>
      <p>{content?.destination?.name}</p>
    </div>
  );
}
