import React from "react";

export default function Title({ titles }) {
  return (
    <div className="d-flex gap-3 table-title">
      {titles.map((title) => (
        <p className="fs-14" style={{ width: "150px" }}>
          {title}
        </p>
      ))}
    </div>
  );
}
