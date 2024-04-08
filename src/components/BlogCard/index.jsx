import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blogDetail }) {
  return (
    <Link href={`/blog/${blogDetail?.slug}`} className="col-12 col-lg-4">
      <div className="border text-dark">
        <Image
          src={blogDetail?.imageUrl}
          width={400}
          height={300}
          alt="blog-image"
          style={{width: "100%"}}
        />
        <div className="px-3">
          <h4 className="my-4 title">{blogDetail?.title}</h4>
        </div>
      </div>
    </Link>
  );
}
