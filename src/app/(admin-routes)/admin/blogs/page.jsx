"use client";
import AdminPages from "@/components/AdminPages";
import CreateBlog from "@/components/CreateComponents/CreateBlog";
import CreateDepartureDate from "@/components/CreateComponents/CreateDepartureDate";
import CreateDifficulty from "@/components/CreateComponents/CreateDifficulty";
import CallAllEdits from "@/components/EditPackage/CallAllEdits";

import React, { useState } from "react";

export default function Blog() {
  const data = {
    pageName: "Blogs",
    createComponent: <CreateDifficulty />,
    titles: ["NAME", "DESCRIPTION"],
    apiName: "difficulty",
  };

  const [images, setImages] = useState([]);
  console.log("images", images);

  return (
    <div>
      {/* <AdminPages data={data} /> */}
      <h1>blogs</h1>
      <CallAllEdits />
    </div>
  );
}
