"use client";
import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import axios from "axios";
import { toast } from "react-toastify";
import { submitForm } from "@/utils/functions";

export default function CreateFAQ() {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);

  const initialData = {
    packageId: updatePackage._id,
    question: "",
    answer: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialData,
  });
  const { register, handleSubmit } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "faq", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updateForm ? "Update FAQ" : "Create FAQ"}</p>
          <GrClose
            onClick={() => {
              setUpdateForm(null);
              setDialogOpen(false);
            }}
          />
        </div>
        <form>
          <div className="d-flex gap-5">
            <div className="d-flex flex-column gap-2">
              <TextField
                required
                fullWidth
                size="small"
                label="Question"
                type="text"
                variant="outlined"
                {...register("question")}
              />
              <label name="description">Answer</label>
              <TextareaAutosize
                className="w-100"
                size="large"
                type="text"
                variant="outlined"
                {...register("answer")}
              />
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                {updateForm ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
