"use client";
import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";

export default function CreateMenu({ menuName }) {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);

  const initialData = {
    parent: menuName,
    title: "",
    link: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialData,
  });
  const { register, handleSubmit, setValue } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "menu", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <p className="m-0">
            {updateForm
              ? `Update ${updateForm.title}`
              : `Create ${menuName}'s Sub-Menu`}
          </p>
          <GrClose
            onClick={() => {
              setUpdateForm(null);
              setDialogOpen(false);
            }}
          />
        </div>
        <form className="p-4">
          <div className="d-flex row">
            <div className="d-flex flex-column gap-2 col-8">
              <TextField
                required
                fullWidth
                size="small"
                label="Title"
                type="text"
                variant="outlined"
                {...register("title")}
              />
              <TextField
                required
                fullWidth
                size="small"
                label="Link"
                type="text"
                variant="outlined"
                {...register("link")}
              />
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="btn btn-success">
                {updateForm ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
