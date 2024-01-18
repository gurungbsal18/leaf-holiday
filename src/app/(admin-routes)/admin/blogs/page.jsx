"use client";
import AdminPages from "@/components/AdminPages";
import CreateBlog from "@/components/CreateComponents/CreateBlog";
import React from "react";

export default function Blog() {
  const data = {
    pageName: "Blogs",
    createComponent: <CreateBlog />,
    titles: ["NAME", "DESCRIPTION"],
    contents: [
      {
        label: "Nepal",
        description: "Nepal is a beautiful country.",
        img: "/images/ng.png",
      },
      {
        label: "Bhutan",
        description: "Bhutan is a beautiful country.",
        img: "/images/nma.png",
      },
      {
        label: "Tibet",
        description: "Tibet is a beautiful country.",
        img: "/images/ntb.png",
      },
    ],
  };

  return (
    <div>
      <AdminPages data={data} />
    </div>
  );
}
