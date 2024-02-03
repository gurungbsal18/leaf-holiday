"use client";
import AdminPages from "@/components/AdminPages";
import React from "react";

export default function Package() {
  const data = {
    pageName: "Package",
    titles: [
      { title: "NAME", style: { width: "500px" } },
      { title: "DESCRIPTION", style: { width: "100px" } },
    ],
    apiName: "package",
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
