"use client";
import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";

export default function UserDetail() {
  const { user, isAuthUser } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm({
    defaultValues: user || JSON.parse(localStorage.getItem("user")),
  });

  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>PERSONAL INFORMATION</h1>
      <div>
        <form>
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
          <button onClick={handleSubmit(submitForm)}>UPDATE</button>
        </form>
      </div>
    </div>
  );
}
