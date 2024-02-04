"use client";
import AdminPages from "@/components/AdminPages";
import CreateTestimonial from "@/components/CreateComponents/CreateTestimonial";
import React from "react";

export default function Testimonial() {
  const data = {
    pageName: "Testimonials",
    createComponent: <CreateTestimonial />,
    headerData: [
      { Header: "NAME", accessor: "userID.name" },
      { Header: "PACKAGE", accessor: "packageId.name" },
      { Header: "COMMENT", accessor: "comment" },
      { Header: "RATING", accessor: "stars" },
    ],
    // showView: true,
    showEdit: true,
    showRemove: true,
    // showImage: true,
    apiName: "review",
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
