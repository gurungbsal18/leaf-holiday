import React from "react";
import Image from "next/image";

export default function BlogCard({ blogDetail }) {
  return (
    <div>
      <div>
        <Image src={blogDetail?.imageUrl} width={100} height={100} />
      </div>
      <div>
        <p>{blogDetail?.title}</p>
        <div dangerouslySetInnerHTML={{ __html: blogDetail?.content }}></div>
      </div>
    </div>
  );
}
