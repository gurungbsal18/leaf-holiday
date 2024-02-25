"use client";
import React, { useContext, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
// import {  submitForm } from "@/utils/functions";

export default function UploadGallery() {
  const { updatePackage } = useContext(GlobalContext);
  const [images, setImages] = useState(
    (updatePackage?.gallery && updatePackage?.gallery[0]?.images) || []
  );
  const packageId = updatePackage?._id;
  const [updateGallery, setUpdateGallery] = useState(
    updatePackage?.gallery && updatePackage?.gallery?.length !== 0
  );
  const [galleryId, setGalleryId] = useState(
    updatePackage?.gallery && updatePackage?.gallery[0]?._id
  );

  const handleRemove = (index) => {
    const updatedImages = [...images];
    // Remove the image at the specified index
    updatedImages.splice(index, 1);
    // Update the state with the new array
    setImages(updatedImages);
  };

  images;
  const handleSubmit = async () => {
    const data = {
      packageId: packageId,
      images: images,
    };
    let res;

    if (updateGallery) {
      res = await axios.put(`/gallery/update/${galleryId}`, data);
    } else {
      res = await axios.post(`/gallery/add`, data);
      if (res.status === 200) {
        setGalleryId(res.data.data._id);
        setUpdateGallery(true);
      }
    }
  };

  return (
    <div className="bg-light p-3 rounded mt-4">
      <h4 className="title fw-bold">Gallery</h4>
      <div className="d-flex gap-3">
        {images?.map((imagelink, index) => (
          <div
            key={imagelink}
            className="d-flex flex-column align-items-start gap-3 "
          >
            <Image
              src={imagelink}
              width={120}
              height={120}
              alt="gallery-image"
            />
            <button
              onClick={() => handleRemove(index)}
              className="btn btn-sm btn-danger"
            >
              Remove Image
            </button>
          </div>
        ))}
      </div>
      <div className="d-flex gap-2 mt-3">
        <CldUploadWidget
          options={{ sources: ["local"], resourceType: ["image"] }}
          uploadPreset="uploadPreset"
          onSuccess={(result) => {
            setImages((prev) => [...prev, result?.info?.secure_url]);
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              open();
            }
            return (
              <button
                onClick={handleOnClick}
                className="btn btn-sm btn-primary"
              >
                Upload Gallery
              </button>
            );
          }}
        </CldUploadWidget>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-sm btn-success"
        >
          {updateGallery ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
}
