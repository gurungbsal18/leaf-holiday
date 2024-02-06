"use client";
import AdminPages from "@/components/AdminPages";
import CreateRegion from "@/components/CreateComponents/CreateRegion";
import React from "react";

export default function Region() {
  const data = {
    pageName: "Region",
    createComponent: <CreateRegion />,
    headerData: [
      { Header: "NAME", accessor: "name" },
      { Header: "DESTINATION", accessor: "destination.name" },
      { Header: "DESCRIPTION", accessor: "description" },
    ],
    showView: true,
    showEdit: true,
    showRemove: true,
    showImage: true,
    apiName: "region",
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
