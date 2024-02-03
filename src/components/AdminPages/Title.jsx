import React from "react";

export default function Title({ titles }) {
  return (
    <div className="d-flex gap-3 table-title">
      {titles.map((item) => (
        <p className="fs-14" style={item?.style}>
          {item?.title}
        </p>
      ))}
    </div>
  );
}
