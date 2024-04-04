import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blogDetail }) {
  return (
    <Link
      href={`/blog/${blogDetail?.slug}`}
      className="col-12 col-lg-4 border text-dark">
      <Image
        src={blogDetail?.imageUrl}
        width={400}
        height={300}
        alt="blog-image"
      />
      <div className="px-3">
        <h4 className="my-4 title">{blogDetail?.title}</h4>
      </div>
    </Link>
  );
}
