import React from "react";
import Image from "next/image";

export default function Contents({ contents }) {
  return (
    <div>
      {contents.map((content) => (
        <div className="d-flex gap-5" key={content.label}>
          <Image src={content.img} width={25} height={25} />
          <p>{content.label}</p>
          <p>{content.description}</p>
          <div className="d-flex gap-2">
            <p>Edit</p>
            <p>Remove</p>
          </div>
        </div>
      ))}
    </div>
  );
}
