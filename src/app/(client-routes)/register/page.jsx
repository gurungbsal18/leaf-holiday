"use client";

import { registrationFormControls } from "@/utils";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TextField from "@mui/material/TextField";

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
    <div className="d-flex">
      <div className="register-container w-50 ">
        <div className="register-text">
          <h1>Register</h1>
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
            <button>Regsiter</button>
          </div>
        </form>
        <div className="login-router">
          <span className="d-flex">
            <p>Already Have An Account?</p>
            <a href="/login">Login</a>
          </span>
        </div>
      </div>
      <div className="register-image w-50 "></div>
    </div>
  );
}
