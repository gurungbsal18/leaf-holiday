import React from "react";

export default function ({ pageName, createComponent }) {
  return (
    <div className="d-flex justify-content-between ">
      <h3>{pageName}</h3>
      <div>
        <input type="text" />
        <button>Create</button>
      </div>
    </div>
  );
}
