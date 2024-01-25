import React from "react";

export default function Title({ titles }) {
  return (
    <div className="d-flex gap-5">
      {titles.map((title) => (
        <p className="fs-14">{title}</p>
      ))}
    </div>
  );
}
