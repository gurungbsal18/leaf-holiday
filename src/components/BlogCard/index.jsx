import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";

export default function BlogCard({ blogDetail }) {
  const { setPageLevelLoader } = useContext(GlobalContext);
  const router = useRouter();
  return (
    <div
      className="col-12 col-lg-4 border"
      onClick={() => {
        setPageLevelLoader(true);
        router.push(`/blog/${blogDetail?.slug}`);
      }}
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
          className="blog-card-content d-none"
        ></div>
      </div>
    </div>
  );
}
