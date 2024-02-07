"use client";
import axios from "axios";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="dashboard-content-section p-4">
        <div>
          <h2>Admin Dashboard</h2>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button
            onClick={async () => {
              const res = await axios.get(
                `${
                  process.env.NEXT_PUBLIC_SERVER_URL
                }/package/search/slug/${value
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`
              );
              console.log(res);
            }}
          >
            check
          </button>
        </div>
      </div>
    </>
  );
}
