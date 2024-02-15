"use client";
import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
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
    data = { ...data, slug: data.name.toLowerCase().replace(/\s+/g, "-") };
    const res = await submitForm(data, "destination", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <p className="m-0">
            {updateForm ? "Update Destination" : "Create Destination"}
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
                label="Name"
                type="text"
                variant="outlined"
                {...register("name")}
              />
              <label name="description">Description</label>
              <TextareaAutosize
                className="w-100 form-control pt-2"
                size="large"
                label="Description"
                type="text"
                variant="outlined"
                {...register("description")}
              />
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-success">
                  {updateForm ? "Update" : "Create"}
                </button>
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
        </form>
      </div>
    </div>
  );
}
