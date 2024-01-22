"use client";
import AdminPages from "@/components/AdminPages";
import CreateBlog from "@/components/CreateComponents/CreateBlog";
import CreateDepartureDate from "@/components/CreateComponents/CreateDepartureDate";
import CreateFAQ from "@/components/CreateComponents/CreateFAQ";
import CreateItinerary from "@/components/CreateComponents/CreateItinerary";
import React from "react";

export default function Blog() {
  const data = {
    pageName: "Blogs",
    createComponent: <CreateDepartureDate />,
    titles: ["NAME", "DESCRIPTION"],
    apiName: "departureDate",
  };

  return (
    <div>
      <AdminPages data={data} />
    </div>
  );
}
