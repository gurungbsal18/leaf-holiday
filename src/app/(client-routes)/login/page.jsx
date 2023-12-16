"use client";

import { loginFormControls } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const { register, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log("form submitted", data);
  };

  return (
    <div className="d-flex">
      <div className="register-container w-50 ">
        <div className="register-text">
          <h1>Register</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container d-flex flex-column gap-3">
            {loginFormControls.map((formControl) => (
              <TextField
                required
                fullWidth
                size="small"
                id={formControl.id}
                label={formControl.label}
                type={formControl.type}
                variant="outlined"
                {...register(formControl.id)}
              />
            ))}

            <button>Log In</button>
          </div>
        </form>
        <div className="register-router">
          <span className="d-flex">
            <p>Don't Have An Account?</p>
            <a href="/register">Register</a>
          </span>
        </div>
      </div>
      <div className="register-image w-50 "></div>
    </div>
  );
}
