"use client";
import AdminPages from "@/components/AdminPages";
import CreateRegion from "@/components/CreateComponents/CreateRegion";
import React from "react";

export default function Region() {
  const data = {
    pageName: "Regions",
    createComponent: <CreateRegion />,
    titles: ["NAME", "DESCRIPTION"],
    apiName: "region",
  };

  return (
    <div>
      <AdminPages data={data} />
    </div>
  );
}
