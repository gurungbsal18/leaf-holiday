"use client";
import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import React from "react";

export default function CloudinaryUpload({ setImageUrl }) {
  const handleUpload = (publicId) => {
    setImageUrl(publicId.info.secure_url);
  };
  return (
    <CldUploadWidget
      options={{ sources: ["local", "url"] }}
      uploadPreset="uploadPreset"
      onSuccess={handleUpload}>
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <button onClick={handleOnClick}>
            <ImagePlus />
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
