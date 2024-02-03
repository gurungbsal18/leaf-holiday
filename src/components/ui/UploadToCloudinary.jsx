import React from "react";
import Image from "next/image";
import { uploadImage } from "@/utils/functions";
import { toast } from "react-toastify";

export default function UploadToCloudinary({
  label,
  selectedFile,
  setSelectedFile,
  setValue,
  formName,
}) {
  return (
    <div className="border-2 col">
      {label && <p>{label}</p>}
      {selectedFile &&
        (label === "PDF" ? (
          <div>
            <iframe src={selectedFile} height={300} width={300} />
            <button onClick={() => setSelectedFile(null)}>Remove PDF</button>
          </div>
        ) : (
          <div className="d-flex flex-column custom-modal-image">
            <Image
              src={selectedFile}
              height={300}
              width={300}
              alt="header-image"
            />
            <button
              onClick={() => {
                setSelectedFile(null);
                setValue(formName, "");
              }}
              className="btn btn-sm btn-success my-3"
            >
              Remove Image
            </button>
          </div>
        ))}
      <input
        type="file"
        accept={label === "PDF" ? "application/pdf" : "image/*"}
        fileName={selectedFile}
        onChange={async (e) => {
          // Handle selected file here
          const file = e.target.files[0];
          try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await uploadImage(formData);
            if (res.success) {
              setValue(formName, res.imageUrl);
              setSelectedFile(res.imageUrl);
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          } catch (e) {
            toast.error("Failed to Upload Image on Cloudinary", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }}
      />
    </div>
  );
}
