import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogCard({ blogDetail }) {
  const router = useRouter();
  return (
    <div
      className="col-4 border pb-3"
      onClick={() => router.push(`/blog/${blogDetail?.slug}`)}
    >
      <Image
        src={blogDetail?.imageUrl}
        width={800}
        height={800}
        alt="blog-image"
      />
      <div className="px-3">
        <h4 className="my-4 title">{blogDetail?.title}</h4>
        <div
          dangerouslySetInnerHTML={{ __html: blogDetail?.content }}
          className="blog-card-content"
        ></div>
      </div>
    </div>
  );
}
