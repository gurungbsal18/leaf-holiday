"use client";
import AdminPages from "@/components/AdminPages";
import CreateDifficulty from "@/components/CreateComponents/CreateDifficulty";

import React, { useState } from "react";

export default function Blog() {
  const data = {
    pageName: "Blogs",
    createComponent: <CreateDifficulty />,
    titles: ["NAME", "DESCRIPTION"],
    apiName: "difficulty",
  };

  return (
    <div>
      {/* <AdminPages data={data} /> */}
      <h1>blogs</h1>
    </div>
  );
}
