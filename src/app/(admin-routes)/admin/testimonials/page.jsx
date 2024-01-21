"use client";
import AdminPages from "@/components/AdminPages";
import CreateTestimonial from "@/components/CreateComponents/CreateTestimonial";
import React from "react";

export default function Testimonial() {
  const data = {
    pageName: "Testimonials",
    createComponent: <CreateTestimonial />,
    titles: ["NAME", "DESCRIPTION"],
    apiName: "review",
  };

  return (
    <div>
      <AdminPages data={data} />
    </div>
  );
}
