"use client";
import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "@/utils/axios";

export default function UserDetail() {
  const { user, isAuthUser } = useContext(GlobalContext);

  const { register, handleSubmit } = useForm({
    defaultValues: user,
  });
  const router = useRouter();

  const submitForm = async (data) => {
    if (!isAuthUser) {
      toast.error("Please Log In to Continue", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      try {
        const res = await axios.put(`/user/update/${data._id}`, data);
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res?.data?.data));
          toast.success("Personal Data Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("Something Went Wrong. Please Try Again...", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (e) {
        toast.error(
          e?.response?.data?.error ||
            "Something Went Wrong. Please Try Again...",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    }
  };
  return (
    <div className="col-9 px-2 mt-2">
      <h4>PERSONAL INFORMATION</h4>
      <div className="mt-5">
        <form className="d-flex flex-column gap-3">
          <TextField
            required
            size="small"
            label="Full Name"
            type="text"
            variant="outlined"
            {...register("name")}
            className="mb-3"
          />
          <TextField
            required
            size="small"
            label="Email"
            type="text"
            variant="outlined"
            {...register("email")}
            className="mb-3"
          />
          <TextField
            required
            size="small"
            label="Phone Number"
            type="text"
            variant="outlined"
            {...register("phoneNumber")}
            className="mb-3"
          />
          <TextField
            required
            size="small"
            label="Address"
            type="text"
            variant="outlined"
            {...register("address")}
            className="mb-3"
          />
          <div className="d-flex justify-content-start">
            <button
              onClick={handleSubmit(submitForm)}
              className="btn btn-sm btn-success">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
