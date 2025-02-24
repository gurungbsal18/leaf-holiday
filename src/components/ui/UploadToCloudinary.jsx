"use client";
import React, { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/utils/functions";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { BeatLoader } from "react-spinners";

export default function UploadToCloudinary({
  label,
  selectedFile,
  setSelectedFile,
  setValue,
  formName,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="border-2 col">
      {label && <p>{label}</p>}
      {loading ? (
        <div>
          <BeatLoader
            color="#198754"
            loading={true}
            size={10}
            data-testid="loader"
            speedMultiplier={1}
          />
        </div>
      ) : (
        selectedFile &&
        (label === "PDF" ? (
          <div className="d-flex flex-column pdf-upload">
            <iframe src={selectedFile} height={300} width={300} />
            <button
              onClick={() => setSelectedFile(null)}
              className="my-2 btn btn-danger">
              <PictureAsPdfIcon className="me-2" />
              Remove PDF
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column custom-modal-image">
            <Image
              src={selectedFile}
              height={150}
              width={150}
              alt="header-image"
            />
            <button
              onClick={() => {
                setSelectedFile(null);
                setValue(formName, "");
              }}
              className="btn btn-sm btn-danger my-3">
              <DeleteIcon /> Remove Image
            </button>
          </div>
        ))
      )}
      <input
        type="file"
        accept={label === "PDF" ? "application/pdf" : "image/*"}
        // fileName={selectedFile}
        onChange={async (e) => {
          // Handle selected file here
          const file = e.target.files[0];
          file;
          try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const res = await uploadImage(formData);
            if (res.success) {
              setValue(formName, res.imageUrl);
              setSelectedFile(res.imageUrl);
              setLoading(false);
            } else {
              toast.error("Failed to Upload Image", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setLoading(false);
            }
          } catch (e) {
            toast.error(
              e?.response?.data?.error ||
                "Something Went Wrong. Please Try Again...",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
            setPageLevelLoader(false);
          }
        }}
      />
    </div>
  );
}
