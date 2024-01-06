"use client";

import { loginFormControls } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Image from "next/image";

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
    <div className="container d-flex flex-column-reverse flex-md-row justify-content-between my-5 gap-5 align-items-center">
      <div className="register-container">
        <div className="register-text">
          <h4>Login To Leaf Holiday</h4>
          <p>Join to Leaf Holiday and book your favorite treks and tours.</p>
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

            <div className="d-flex gap-2">
              <Button variant="success" className="flex-grow-1">
                Login
              </Button>
              <Button variant="secondary" className="flex-grow-1">
                Cancel
              </Button>
            </div>
          </div>
        </form>
        <div className="register-router">
          <span className="d-flex flex-column flex-md-row mt-3">
            <p className="m-0">Don't Have An Account?</p>
            <span className="ms-0 ms-md-2">
              <a href="/register">Register</a>
            </span>
          </span>
        </div>
      </div>
      <div className="register-image">
        <Image
          src="/images/login-page.png"
          width={537}
          height={360}
          sizes="(max-width: 576px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
