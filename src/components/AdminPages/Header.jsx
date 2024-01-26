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
    <div className="d-flex justify-content-between ">
      <h3>{pageName}</h3>
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={() => {
            if (pageName === "Packages") {
              router.push("/admin/packages/create-package");
              setUpdatePackage(null);
            } else {
              setDialogOpen(true);
              setDialogContent(createComponent);
            }
          }}>
          Create
        </button>
      </div>
    </div>
  );
}
