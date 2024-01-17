"use client";
import AdminPages from "@/components/AdminPages";
import CreateRegion from "@/components/CreateRegion";
import React from "react";

export default function Region() {
  const data = {
    pageName: "Regions",
    createComponent: <CreateRegion />,
    titles: ["NAME", "DESCRIPTION"],
    contents: [
      {
        label: "Nepal",
        description: "Nepal is a beautiful region.",
        img: "/images/ng.png",
      },
      {
        label: "Bhutan",
        description: "Bhutan is a beautiful region.",
        img: "/images/nma.png",
      },
      {
        label: "Tibet",
        description: "Tibet is a beautiful region.",
        img: "/images/ntb.png",
      },
    ],
  };

  return (
    <div>
      <AdminPages data={data} />
    </div>
  );
}
