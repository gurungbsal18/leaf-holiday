import React from "react";

export default function Title({ titles }) {
  return (
    <div className="d-flex gap-5 ">
      {titles.map((title) => (
        <h6>{title}</h6>
      ))}
    </div>
  );
}
