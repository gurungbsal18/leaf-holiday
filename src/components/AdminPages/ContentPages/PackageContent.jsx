import React from "react";
import Image from "next/image";

export default function PackageContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <div className="d-flex">
        <Image
          src={content?.imageUrl}
          width={25}
          height={25}
          alt="package-image"
        />
        <p>{content?.name}</p>
      </div>
      <p>{content?.price}</p>
      <p>{content?.region?.name}</p>
      <p>{content?.status}</p>
      <p>{content?.date}</p>
    </div>
  );
}
