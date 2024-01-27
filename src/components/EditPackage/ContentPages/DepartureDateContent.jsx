import React from "react";
import dayjs from "dayjs";

export default function DepartureDateContent({ content }) {
  return (
    <div className="d-flex gap-3">
      <p>{dayjs(content?.startDate).format("MMM DD, YYYY")}</p>
      <p>{dayjs(content?.endDate).format("MMM DD, YYYY")}</p>
      <p>{content?.isAvailable ? "Available" : "Unavailable"}</p>
      <p>{content?.pricePerPerson}</p>
    </div>
  );
}
