"use client";
import AdminPages from "@/components/AdminPages";
import CreateRegion from "@/components/CreateComponents/CreateRegion";
import React from "react";

export default function Region() {
  const data = {
    pageName: "Regions",
    createComponent: <CreateRegion />,
    titles: ["NAME", "DESCRIPTION", "DESTINATION"],
    apiName: "region",
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
