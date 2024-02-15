"use client";
import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import PostAddIcon from "@mui/icons-material/PostAdd";

export default function Header({
  pageName,
  createComponent,
  keyword,
  setKeyword,
}) {
  const { setDialogOpen, setDialogContent, setUpdatePackage } =
    useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="d-flex justify-content-between flex-column">
      <h4 className="">List of {pageName}s</h4>
      <div className="d-flex justify-content-between align-items-center mb-5 mt-3 flex-column flex-md-row gap-3">
        <button
          className="btn btn-success"
          onClick={() => {
            if (pageName === "Package") {
              router.push("/admin/packages/create-package");
              setUpdatePackage(null);
            } else if (pageName === "Blog") {
              router.push("/admin/blogs/create");
              setUpdatePackage(null);
            } else {
              setDialogOpen(true);
              setDialogContent(createComponent);
            }
          }}>
          <PostAddIcon className="me-1" />
          {`Create New ${pageName}`}
        </button>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="form-control search-package-input"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
