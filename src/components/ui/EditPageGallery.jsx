"use client";
import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

export default function EditPageGallery({ documentImages, setValue }) {
  const [images, setImages] = useState(documentImages);

  const handleRemove = (index) => {
    const updatedImages = [...images];
    // Remove the image at the specified index
    updatedImages.splice(index, 1);
    // Update the state with the new array
    setImages(updatedImages);
    setValue("document", updatedImages);
  };

  return (
    <div className="mt-5">
      <h4>Company Documents</h4>
      <div className="d-flex gap-3 flex-column">
        {images?.map((imagelink, index) => (
          <div
            key={imagelink}
            className="d-flex flex-column align-items-start gap-3 "
          >
            <Image src={imagelink} width={50} height={50} />
            <button
              onClick={() => handleRemove(index)}
              className="btn btn-danger"
            >
              Remove Image
            </button>
          </div>
        ))}
      </div>
      <CldUploadButton
        onUpload={(result) => {
          setImages([...images, result.info.secure_url]);
          setValue("document", [...images, result.info.secure_url]);
        }}
        uploadPreset="uploadPreset"
        className="btn btn-success mt-3"
      >
        Upload Images
      </CldUploadButton>
    </div>
  );
}
