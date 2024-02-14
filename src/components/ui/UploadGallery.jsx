"use client";
import React, { useContext, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { GlobalContext } from "@/context";
// import {  submitForm } from "@/utils/functions";
import axios from "axios";

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
      res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/gallery/update/${galleryId}`,
        data
      );
    } else {
      res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/gallery/add`,
        data
      );
      if (res.status === 200) {
        setGalleryId(res.data.data._id);
        setUpdateGallery(true);
      }
    }
  };

  return (
    <div>
      <h1>Gallery</h1>
      <div className="d-flex gap-3">
        {images?.map((imagelink, index) => (
          <div
            key={imagelink}
            className="d-flex flex-column align-items-center gap-3 ">
            <Image src={imagelink} width={50} height={50} alt="gallery-image" />
            <button onClick={() => handleRemove(index)}>Remove Image</button>
          </div>
        ))}
      </div>
      <CldUploadWidget
        options={{ sources: ["local"], resourceType: ["image"] }}
        uploadPreset="uploadPreset"
        onSuccess={(result) => {
          setImages((prev) => [...prev, result?.info?.secure_url]);
        }}>
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return <button onClick={handleOnClick}>Upload Gallery</button>;
        }}
      </CldUploadWidget>
      <button type="submit" onClick={handleSubmit}>
        {updateGallery ? "Update" : "Submit"}
      </button>
    </div>
  );
}
