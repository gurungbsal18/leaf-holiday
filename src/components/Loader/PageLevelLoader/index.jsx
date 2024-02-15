"use client";

import { BeatLoader } from "react-spinners";

export default function PageLevelLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <BeatLoader
        color="#198754"
        loading={true}
        size={14}
        data-testid="loader"
        speedMultiplier={1}
      />
    </div>
  );
}
