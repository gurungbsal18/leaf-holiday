"use client";
import AdminPages from "@/components/AdminPages";
import React from "react";

export default function Package() {
  const data = {
    pageName: "Packages",
    titles: ["NAME", "DESCRIPTION"],
    apiName: "package",
  };

  return (
    <div>
      <AdminPages data={data} />
    </div>
  );
}
