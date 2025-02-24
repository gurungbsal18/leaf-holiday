"use client";
import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import { toast } from "react-toastify";
import axios from "@/utils/axios";

export default function AddHeroImage() {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = React.useState(
    updateForm ? updateForm.imageUrl : null
  );

  const initialData = {
    imageName: "",
    imageUrl: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialData,
  });
  const { register, handleSubmit, setValue } = form;

  const onSubmit = async (data) => {
    try {
      let res = {};
      updateForm
        ? (res = await axios.put(`/carousel/update/${data._id}`, data))
        : (res = await axios.post("/carousel/addCarousel", data));

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCallExtractAll(!callExtractAll);
        setDialogOpen(false);
        setUpdateForm(null);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  return (
    <div className="">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <p className="m-0">{updateForm ? "Update Image" : "Add Image"}</p>
          <GrClose
            onClick={() => {
              setUpdateForm(null);
              setDialogOpen(false);
            }}
          />
        </div>
        <form className="p-4">
          <div className="col-8">
            <div className="d-flex flex-column gap-2 ">
              <TextField
                required
                fullWidth
                size="small"
                label="Name"
                type="text"
                variant="outlined"
                {...register("imageName")}
              />

              <UploadToCloudinary
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                label="Header Image"
                setValue={setValue}
                formName="imageUrl"
              />
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-success">
                  {updateForm ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
