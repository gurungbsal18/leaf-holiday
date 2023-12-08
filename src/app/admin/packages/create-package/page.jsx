"use client";

import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "react-bootstrap/Button";

export default function CreatePackage() {
  return (
    <div className="create-edit-package">
      <div className="d-flex justify-content-between ">
        <div className="d-flex">
          <Button>
            <KeyboardArrowLeftIcon />
          </Button>
          <h5>Edit Package</h5>
        </div>
        <div>
          <Button>Save As Draft</Button>
          <Button>Publish</Button>
        </div>
      </div>
    </div>
  );
}
