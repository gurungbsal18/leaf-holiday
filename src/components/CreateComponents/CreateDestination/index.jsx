"use client";
import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import axios from "axios";
import { toast } from "react-toastify";
import { submitForm } from "@/utils/functions";
import Notification from "@/components/Notification";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";

export default function CreateDestination() {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(
    updateForm ? updateForm.imageUrl : null
  );
  const openFilePicker = () => {
    inputRef.current.click();
  };

  const initialDestinationData = {
    name: "",
    description: "",
    imageUrl: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialDestinationData,
  });
  const { register, handleSubmit, setValue } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "destination", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updateForm ? "Update Destination" : "Create Destination"}</p>
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
                label="Name"
                type="text"
                variant="outlined"
                {...register("name")}
              />
              <label name="description">Description</label>
              <TextareaAutosize
                className="w-100"
                size="large"
                label="Description"
                type="text"
                variant="outlined"
                {...register("description")}
              />
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                {updateForm ? "Update" : "Create"}
              </button>
            </div>
            <UploadToCloudinary
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              label="Header Image"
              setValue={setValue}
              formName="imageUrl"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
