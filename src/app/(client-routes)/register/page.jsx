"use client";

import { registrationFormControls } from "@/utils";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import Image from "next/image";

export default function Register() {
  const form = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
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
          <h4>Register</h4>
          <p>Join to Leaf Holiday and book your favorite trek and tours.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container d-flex flex-column gap-3">
            {registrationFormControls.map((formControl) => (
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
            <FormControlLabel
              control={
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                />
              }
              label="I agree to Terms and Conditions."
              {...register("terms")}
            />
            <Button variant="success">Register</Button>
          </div>
        </form>
        <div className="login-router">
          <span className="d-flex mt-3">
            <p>Already Have An Account?</p>
            <a href="/login" className="ms-2">
              Login
            </a>
          </span>
        </div>
      </div>
      <div className="register-image">
        <Image src="/images/register-page.png" width={500} height={425} />
      </div>
    </div>
  );
}
