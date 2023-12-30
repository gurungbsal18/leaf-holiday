"use client";
import AdminPages from "@/components/AdminPages";
import CreateDestination from "@/components/CreateDestination";
import React from "react";

export default function Destination() {
  const data = {
    pageName: "Destination",
    createComponent: <CreateDestination />,
    titles: ["NAME", "DESCRIPTION"],
    contents: [
      {
        label: "Nepal",
        description: "Nepal is a beautiful country.",
        img: "/images/ng.png",
      },
      {
        label: "Bhutan",
        description: "Bhutan is a beautiful country.",
        img: "/images/nma.png",
      },
      {
        label: "Tibet",
        description: "Tibet is a beautiful country.",
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
