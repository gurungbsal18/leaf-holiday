"use client";
import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

export default function ({ pageName, createComponent, keyword, setKeyword }) {
  const { createComponentOpen, setCreateComponentOpen } =
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
            } else {
              setCreateComponentOpen(true);
            }
          }}>
          Create
        </button>
      </div>
      <Dialog open={createComponentOpen}>{createComponent}</Dialog>
    </div>
  );
}
