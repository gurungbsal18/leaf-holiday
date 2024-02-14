"use client";
import React, { useContext, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";

import { submitForm } from "@/utils/functions";
import TextEditor from "@/components/TextEditor";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const {
    user,
    setUpdatePackage,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = React.useState(
    updatePackage ? updatePackage.imageUrl : null
  );
  const router = useRouter();
  const initialFormData = {
    title: "",
    content: "",
    options: "article",
    imageUrl: "",
    metaTitle: "",
    metaDescription: "",
    authorId: user?._id,
    isSelected: false,
  };

  const form = useForm({
    defaultValues: updatePackage ? updatePackage : initialFormData,
  });
  const { register, handleSubmit, setValue, control, watch } = form;

  const onSubmit = async (data) => {
    data = { ...data, slug: data.title.toLowerCase().replace(/\s+/g, "-") };
    const res = await submitForm(data, "blog", updatePackage);
    if (res.status === 200) {
      setCallExtractAll(!callExtractAll);
      setUpdatePackage(null);
      router.push("/admin/blogs");
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updatePackage ? "Update Blog" : "Create Blog"}</p>
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            {updatePackage ? "Update" : "Create"}
          </button>
        </div>
        <form>
          <div className="d-flex gap-5">
            <div className="d-flex flex-column gap-2">
              <TextField
                required
                fullWidth
                size="small"
                label="Title"
                type="text"
                variant="outlined"
                {...register("title")}
              />
              <div>
                <label htmlFor="content">Content</label>
                <TextEditor control={control} name={"content"} />
              </div>
              <div>
                <TextField
                  required
                  size="small"
                  label="Meta Title"
                  type="text"
                  variant="outlined"
                  {...register("metaTitle")}
                />
                <TextField
                  required
                  size="small"
                  label="Meta Description"
                  type="text"
                  variant="outlined"
                  {...register("metaDescription")}
                />
              </div>
            </div>
            <div>
              <div className="d-flex flex-column">
                <p>Options</p>
                <div>
                  <input
                    checked={watch("options") === "article"}
                    type="radio"
                    id="article"
                    name="options"
                    value="article"
                    onClick={() => setValue("options", "article")}
                  />
                  <label for="html">Article</label>
                </div>
                <div>
                  <input
                    checked={watch("options") === "news"}
                    type="radio"
                    id="news"
                    name="options"
                    value="news"
                    onClick={() => setValue("options", "news")}
                  />
                  <label for="css">News</label>
                </div>
              </div>
              <UploadToCloudinary
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                label="Header Image"
                setValue={setValue}
                formName="imageUrl"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
