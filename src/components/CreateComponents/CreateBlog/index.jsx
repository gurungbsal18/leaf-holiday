import React from "react";
import { CldUploadButton } from "next-cloudinary";
import MyForm from "@/components/ui/test";

export default function CreateBlog() {
  return (
    <div>
      <h1>create blog</h1>

      {/* <CldUploadButton uploadPreset="<Upload Preset>" /> */}
      <MyForm />
    </div>
  );
}
