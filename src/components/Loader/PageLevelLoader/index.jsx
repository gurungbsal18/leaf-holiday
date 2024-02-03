"use client";

import { BeatLoader } from "react-spinners";

export default function PageLevelLoader({ loading }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <BeatLoader
        color="#36d7b7"
        loading={loading}
        size={10}
        data-testid="loader"
        speedMultiplier={1}
      />
    </div>
  );
}
