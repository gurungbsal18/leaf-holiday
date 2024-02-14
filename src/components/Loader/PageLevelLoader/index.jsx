"use client";

import { BeatLoader } from "react-spinners";

export default function PageLevelLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100vh">
      <BeatLoader
        color="#198754"
        loading={true}
        size={30}
        data-testid="loader"
        speedMultiplier={1}
      />
    </div>
  );
}
