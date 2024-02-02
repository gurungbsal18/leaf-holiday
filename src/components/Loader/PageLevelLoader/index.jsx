"use client";

import { FadeLoader } from "react-spinners";

export default function PageLevelLoader({ loading }) {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <FadeLoader
        color="#000000"
        loading={loading}
        size={30}
        data-testid="loader"
      />
    </div>
  );
}
