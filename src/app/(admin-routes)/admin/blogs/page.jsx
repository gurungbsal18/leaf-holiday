"use client";
import AdminPages from "@/components/AdminPages";
import CreateDifficulty from "@/components/CreateComponents/CreateDifficulty";

import React, { useState } from "react";

export default function Blog() {
  const data = {
    pageName: "Blog",
    apiName: "blog",
    headerData: [
      { Header: "NAME", accessor: "authorId.name" },
      { Header: "TITLE", accessor: "title" },
      { Header: "CATEGORY", accessor: "options" },
    ],
    showView: true,
    showEdit: true,
    showRemove: true,
    showImage: true,
    checkbox: false,
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
