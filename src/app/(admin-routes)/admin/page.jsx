"use client";
import Fancybox from "@/components/FancyappWrapper";
import axios from "axios";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="dashboard-content-section p-4">
        <div>
          <h2>Admin Dashboard</h2>
          <Fancybox
            options={{
              Carousel: {
                infinite: false,
              },
            }}
          >
            <a
              data-fancybox="gallery"
              href="https://lipsum.app/id/60/1600x1200"
            >
              <img
                src="https://lipsum.app/id/60/200x150"
                width="200"
                height="150"
              />
            </a>
            <a
              data-fancybox="gallery"
              href="https://lipsum.app/id/61/1600x1200"
            >
              <img
                src="https://lipsum.app/id/61/200x150"
                width="200"
                height="150"
              />
            </a>
            <a
              data-fancybox="gallery"
              href="https://lipsum.app/id/62/1600x1200"
            >
              <img
                src="https://lipsum.app/id/62/200x150"
                width="200"
                height="150"
              />
            </a>
            <a
              data-fancybox="gallery"
              href="https://lipsum.app/id/63/1600x1200"
            >
              <img
                src="https://lipsum.app/id/63/200x150"
                width="200"
                height="150"
              />
            </a>
            <a
              data-fancybox="gallery"
              href="https://lipsum.app/id/64/1600x1200"
            >
              <img
                src="https://lipsum.app/id/64/200x150"
                width="200"
                height="150"
              />
            </a>
          </Fancybox>
        </div>
      </div>
    </>
  );
}
