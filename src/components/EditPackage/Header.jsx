"use client";
import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

export default function Header({ pageName, createComponent }) {
  const { dialogOpen, setDialogOpen, dialogContent, setDialogContent } =
    useContext(GlobalContext);

  return (
    <div className="d-flex justify-content-between ">
      <h4 className="title">{pageName}</h4>
      <button
        onClick={() => {
          setDialogOpen(true);
          setDialogContent(createComponent);
        }}
      >
        Create
      </button>
    </div>
  );
}
