import React from "react";

export default function Title({ titles }) {
  return (
    <div className="d-flex gap-5 ">
      {titles.map((title, index) => (
        <h6 key={`title-${index}`}>{title}</h6>
      ))}
    </div>
  );
}
