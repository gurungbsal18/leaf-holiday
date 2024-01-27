"use client";
import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

export default function ({ pageName, createComponent, keyword, setKeyword }) {
  const { setDialogOpen, setDialogContent, setUpdatePackage } =
    useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="d-flex justify-content-between flex-column">
      <h4 className="">List of {pageName}s</h4>
      <div className="d-flex justify-content-between mb-5 mt-3 flex-column flex-md-row gap-3">
        <button
          className="btn btn-success"
          onClick={() => {
            if (pageName === "Packages") {
              router.push("/admin/packages/create-package");
              setUpdatePackage(null);
            } else {
              setDialogOpen(true);
              setDialogContent(createComponent);
            }
          }}
        >
          {`+ Create New ${pageName}`}
        </button>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="form-control search-package-input"
          placeholder="Search Pacakges"
        />
      </div>
    </div>
  );
}
