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
import PageLevelLoader from "@/components/Loader/PageLevelLoader";

export default function CreateBlog() {
  const {
    user,
    setUpdatePackage,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
    pageLevelLoader,
    setPageLevelLoader,
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
    setPageLevelLoader(true);
    try {
      data = {
        ...data,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        authorId: user?._id,
      };
      const res = await submitForm(data, "blog", updatePackage);
      if (res.status === 200) {
        toast.success(
          updatePackage
            ? "Blog Updated Successfully"
            : "Blog Created Successfully",
          { position: toast.POSITION.TOP_RIGHT }
        );
        setCallExtractAll(!callExtractAll);
        setUpdatePackage(null);
        router.push("/admin/blogs");
      } else {
        toast.error(
          res?.message || "Something went wrong. Please try again !!!",
          { position: toast.POSITION.TOP_RIGHT }
        );
      }
      setPageLevelLoader(false);
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          "Something went wrong. Please try again !!!",
        { position: toast.POSITION.TOP_RIGHT }
      );
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    setPageLevelLoader(false);
  });

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="create-edit-package pt-0 p-2">
          <div className="">
            <div className="d-flex flex-column flex-md-row justify-content-start justify-content-md-between sticky-top bg-white py-2 align-itmes-start align-items-md-center border-bottom mb-2">
              <h4 className="dashboard-header-title">
                {updatePackage ? "Update Blog" : "Create Blog"}
              </h4>
              <button
                className="btn btn-sm btn-success"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {updatePackage ? "Update" : "Create"}
              </button>
            </div>
            <form>
              <div className="row gap-5 w-100 py-3">
                <div className="col dashboard-main-content">
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Title"
                    type="text"
                    variant="outlined"
                    {...register("title")}
                  />
                  <div className="mt-3">
                    <label htmlFor="content">Content</label>
                    <TextEditor control={control} name={"content"} />
                  </div>
                  <div className="d-flex gap-3 flex-column bg-light p-3 mt-3">
                    <h4 className="dashboard-header-title">SEO</h4>

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
                <div className="col-auto dashboard-main-content-sidebar">
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
      )}
    </>
  );
}
