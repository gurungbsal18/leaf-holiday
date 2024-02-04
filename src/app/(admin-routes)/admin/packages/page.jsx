"use client";
import AdminPages from "@/components/AdminPages";
import React from "react";

export default function Package() {
  const data = {
    pageName: "Package",
    apiName: "package",
    headerData: [
      { Header: "NAME", accessor: "name" },
      { Header: "DESTINATION", accessor: "destination.name" },
    ],
    showView: true,
    showEdit: true,
    showRemove: true,
    showImage: true,
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
