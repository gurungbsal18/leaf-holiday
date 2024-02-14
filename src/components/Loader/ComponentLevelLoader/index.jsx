"use client";

import { BeatLoader } from "react-spinners";

export default function ComponentLevelLoader({ text }) {
  return (
    <span className="flex gap-1 items-center">
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
