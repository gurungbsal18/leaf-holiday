import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "@/context";

export default function ({ pageName, createComponent }) {
  const { createComponentOpen, setCreateComponentOpen } =
    useContext(GlobalContext);
  return (
    <div className="d-flex justify-content-between ">
      <h3>{pageName}</h3>
      <div>
        <input type="text" />
        <button onClick={() => setCreateComponentOpen(true)}>Create</button>
      </div>
      <Dialog open={createComponentOpen}>{createComponent}</Dialog>
    </div>
  );
}
