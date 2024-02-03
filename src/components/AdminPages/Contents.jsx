"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import PackageContent from "./ContentPages/PackageContent";
import TestimonialContent from "./ContentPages/TestimonialContent";
import DestinationContent from "./ContentPages/DestinationContent";
import RegionContent from "./ContentPages/RegionContent";
import { useRouter } from "next/navigation";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Contents({ contents, apiName, updateComponent }) {
  const {
    callExtractAll,
    setCallExtractAll,
    setUpdatePackage,
    setUpdateForm,
    setDialogOpen,
    setDialogContent,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function handleRemove(id) {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/delete/${id}`
    );
    if (res.status === 200) {
      setCallExtractAll(!callExtractAll);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div className="dashboard-table">
      {contents?.map((content) => (
        <div
          className="d-flex justify-content-between align-items-center gap-5 table-row"
          key={content._id}
        >
          {apiName === "package" && <PackageContent content={content} />}
          {apiName === "region" && <RegionContent content={content} />}
          {apiName === "destination" && (
            <DestinationContent content={content} />
          )}
          {apiName === "review" && <TestimonialContent content={content} />}
          {/* {apiName === "package" && <PackageContent content={content} />} */}
          <div className="d-flex gap-3">
            <button
              onClick={() => {
                // setUpdateForm(content);
                // apiName === "package"
                //   ? router.push("/admin/packages/create-package")
                //   : setDialogOpen(true);
                // setDialogContent(updateComponent);
                if (apiName === "package") {
                  setUpdatePackage(content);
                  router.push("/admin/packages/create-package");
                } else {
                  setUpdateForm(content);
                  setDialogOpen(true);
                  setDialogContent(updateComponent);
                }
              }}
              className="btn btn-sm btn-success"
            >
              <EditNoteIcon /> Edit
            </button>
            <button
              onClick={() => handleRemove(content._id)}
              className="btn btn-sm btn-danger"
            >
              <DeleteIcon />
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
