"use client";
import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

export default function ({ pageName, createComponent }) {
  const { dialogOpen, setDialogOpen, dialogContent, setDialogContent } =
    useContext(GlobalContext);

  return (
    <div className="d-flex justify-content-between ">
      <h3>{pageName}</h3>
      <button
        onClick={() => {
          setDialogOpen(true);
          setDialogContent(createComponent);
        }}>
        Create
      </button>
    </div>
  );
}
