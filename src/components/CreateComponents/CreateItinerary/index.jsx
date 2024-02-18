"use client";
import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";

import { submitForm } from "@/utils/functions";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import TextEditor from "@/components/TextEditor";

export default function CreateItinerary() {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = React.useState(
    updateForm ? updateForm.imageUrl : null
  );

  const initialFormData = {
    packageId: updatePackage._id,
    title: "",
    content: "",
    maxAltitude: 0,
    meals: "",
    accomodation: "",
    imageUrl: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialFormData,
  });
  const { register, handleSubmit, setValue, control } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "itineraries", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updateForm ? "Update Itinerary" : "Create Itinerary"}</p>
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
                label="Title"
                type="text"
                variant="outlined"
                {...register("title")}
              />
              <div>
                <label name="content">Content</label>
                <TextEditor control={control} name="content" />
              </div>
              <div>
                <TextField
                  size="small"
                  label="Max Altitude"
                  type="number"
                  variant="outlined"
                  {...register("maxAltitude")}
                />
                <TextField
                  size="small"
                  label="Meals"
                  type="text"
                  variant="outlined"
                  {...register("meals")}
                />
                <TextField
                  size="small"
                  label="Accomodation"
                  type="text"
                  variant="outlined"
                  {...register("accomodation")}
                />
              </div>
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
