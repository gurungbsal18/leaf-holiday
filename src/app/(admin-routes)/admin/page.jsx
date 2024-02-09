"use client";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState({
    package: 0,
    region: 0,
    destination: 0,
    blog: 0,
    booking: 0,
    inquiry: 0,
    cutomization: 0,
  });
  return (
    <>
      <div className="dashboard-content-section p-4">
        <div>
          <h2>Admin Dashboard</h2>
        </div>
      </div>
    </>
  );
}
