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
import axios from "@/utils/axios";

export default function CreateAdmin() {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);

  const initialDestinationData = {
    name: "",
    email: "",
    password: "",
    role: "admin",
    isVerified: true,
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialDestinationData,
  });
  const { register, handleSubmit, setValue } = form;

  const onSubmit = async (data) => {
    try {
      let res = {};
      updateForm
        ? (res = await axios.put(`/user/update/${data._id}`, data))
        : (res = await axios.post(`/auth/register`, data));
      console.log(res);

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCallExtractAll(!callExtractAll);
        setDialogOpen(false);
        setUpdateForm(null);
      } else {
        toast.error(
          res.message || "Something Went Wrong. Please Try Again...",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    } catch (e) {
      console.log(e);
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
          <p className="m-0">{updateForm ? "Update Admin" : "Create Admin"}</p>
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
              <TextField
                required
                fullWidth
                size="small"
                label="Email"
                type="email"
                variant="outlined"
                {...register("email")}
              />
              {!updateForm && (
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("password")}
                />
              )}
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-success">
                  {updateForm ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
