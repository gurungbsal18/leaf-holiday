"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

import axios from "axios";

export default function ChangePassword() {
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const { register, watch, handleSubmit } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("user")),
  });

  const handleChangePassword = async (data) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/update/${data._id}`,
        data
      );
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        toast.success("Password Changed successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (e) {
      toast.error(e?.response?.statusText, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="col-9 px-5 mt-2">
      <h4>CHANGE PASSWORD</h4>
      <div className="mt-3">
        <form className="d-flex flex-column gap-3">
          <TextField
            required
            size="small"
            label="New Password"
            type="password"
            variant="outlined"
            {...register("password")}
            className="mb-3"
          />
          <TextField
            required
            error={confirmPassword}
            size="small"
            label="Confirm New Password"
            type="password"
            variant="outlined"
            helperText={confirmPassword && "Password Doesn't Match"}
            onChange={(e) => {
              setConfirmPasswordValue(e.target.value);
              if (e.target.value === watch("password")) {
                setConfirmPassword(false);
              } else {
                setConfirmPassword(true);
              }
            }}
          />
          <div className="d-flex justify-content-start">
            <button
              onClick={handleSubmit(handleChangePassword)}
              disabled={
                watch("password") === "" ||
                watch("password") !== confirmPasswordValue
              }
              className="btn btn-sm btn-success"
            >
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
