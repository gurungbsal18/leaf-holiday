"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "@/context";

export default function ChangePassword() {
  const { user } = useContext(GlobalContext);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      userId: user?._id || JSON.parse(localStorage.getItem("user"))._id || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const handleChangePassword = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>CHANGE PASSWORD</h1>
      <div>
        <form>
          <TextField
            required
            size="small"
            label="Current Password"
            type="password"
            variant="outlined"
            {...register("currentPassword", {
              required: "This field is required",
            })}
            className="mb-3"
          />
          <TextField
            required
            size="small"
            label="New Password"
            type="password"
            variant="outlined"
            {...register("newPassword")}
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
              if (e.target.value === watch("newPassword")) {
                setConfirmPassword(false);
              } else {
                setConfirmPassword(true);
              }
            }}
          />
          <button
            onClick={handleSubmit(handleChangePassword)}
            disabled={
              watch("currentPassword") === "" ||
              watch("newPassword") === "" ||
              confirmPassword === true ||
              watch("newPassword") !== confirmPasswordValue
            }>
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}
