import React from "react";
import Image from "next/image";

export default function PackageContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <div className="d-flex">
        {/* <Image
          src={content?.imageUrl}
          width={25}
          height={25}
          alt="package-image"
        /> */}
        <p style={{ width: "250px" }}>{content?.name}</p>
      </div>
      <p style={{ width: "150px" }}>{content?.price}</p>
      <p style={{ width: "150px" }}>{content?.region?.name}</p>
      <p style={{ width: "150px" }}>{content?.status}</p>
      <p style={{ width: "150px" }}>{content?.date}</p>
    </div>
  );
}
