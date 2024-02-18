"use client";

import { BeatLoader } from "react-spinners";

export default function ComponentLevelLoader({ text }) {
  return (
    <span className="d-flex justify-content-center align-items-center mx-0 my-auto">
      {text}
      <BeatLoader
        color="#198754"
        loading={true}
        size={10}
        data-testid="loader"
      />
    </span>
  );
}
