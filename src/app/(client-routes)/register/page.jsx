"use client";

import { registrationFormControls } from "@/utils";
import Checkbox from "@mui/material/Checkbox";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import axios from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function Register() {
  const { isAuthUser, componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();

  const registerSchema = z.object({
    name: z.string().min(3, { message: "Full Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setComponentLevelLoader(true);
      const res = await axios.post("/auth/register", data);
      if (res.status === 200) {
        toast.success(
          "User Registered Successfully. Please Check Your Email for Verification",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        setComponentLevelLoader(false);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error("Failed To Register User", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setComponentLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e.response.data.error ||
          "Something Went Wrong. Please try again later !!!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setComponentLevelLoader(false);
    }
  };
  useEffect(() => {
    if (isAuthUser) {
      setTimeout(() => {
        router.push("/");
      }, [1000]);
    }
  }, [isAuthUser]);

  return (
    <div className="container d-flex flex-column-reverse flex-md-row justify-content-between my-5 gap-5 align-items-center">
      <div className="register-container">
        <div className="register-text">
          <h4>Register</h4>
          <p>Join to Leaf Holiday and book your favorite trek and tours.</p>
        </div>

        <form>
          <div className="form-container d-flex flex-column gap-3">
            {registrationFormControls.map((formControl) => (
              <>
                <TextField
                  key={formControl.id}
                  required
                  fullWidth
                  size="small"
                  id={formControl.id}
                  label={formControl.label}
                  type={formControl.type}
                  variant="outlined"
                  {...register(formControl.id)}
                />
                {errors[formControl.id] && (
                  <p className="text-danger">
                    {" "}
                    {errors[formControl.id]?.message}
                  </p>
                )}
              </>
            ))}
            <FormControlLabel
              control={
                <Checkbox
                  value={checkbox}
                  onChange={() => setCheckbox(!checkbox)}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                />
              }
              label="I agree to Terms and Conditions."
            />
            <Button
              disabled={!checkbox}
              variant="success"
              onClick={handleSubmit(onSubmit)}>
              {componentLevelLoader ? (
                <ComponentLevelLoader text={"Registering User"} />
              ) : (
                "Register"
              )}
            </Button>
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
        <Image
          src="/images/register-page.png"
          width={500}
          height={425}
          alt="register-img"
        />
      </div>
    </div>
  );
}
