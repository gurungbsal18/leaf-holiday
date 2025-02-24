import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "@/utils/axios";
import BlogCard from "@/components/BlogCard";

export default async function BlogPage() {
  let allBlogs;
  try {
    const res = await axios.get(`/blog/`);
    res;
    if (res.status === 200) {
      allBlogs = res.data?.data;
    } else {
      toast.error("Something Went Wrong. Please Try Again...", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (e) {
    toast.error(
      e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  }

  return (
    <div>
      <div className="header-image">
        <Image
          src="/images/km.png"
          height={500}
          width={1510}
          alt="blog-image"
          priority
        />
      </div>
      <div className="container my-5">
        <h4 className="fw-bold title">Blogs</h4>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
          sapiente ipsam commodi nam suscipit iure libero rem veniam minima quia
          quibusdam eum repellendus expedita voluptatum, provident eos, aliquam,
          minus quaerat aut est! Quos quia quis modi quaerat ex tempore error
          commodi neque dolorem at temporibus iusto soluta reprehenderit
          repudiandae, placeat voluptates earum, assumenda eaque consequuntur
          iste saepe! Nisi, officia perspiciatis!
        </p>
        {allBlogs && (
          <div className="row activity-container">
            {allBlogs.map((item) => (
              <BlogCard key={item._id} blogDetail={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
