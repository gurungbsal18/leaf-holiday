import React from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";

export default function FAQContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <p>{content?.question}</p>
      <p>{content?.answer}</p>
    </div>
  );
}
