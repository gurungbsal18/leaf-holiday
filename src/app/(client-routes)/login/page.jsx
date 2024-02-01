"use client";

import { loginFormControls } from "@/utils";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import { GlobalContext } from "@/context";
import Notification from "@/components/Notification";

export default function Login() {
  const {
    trackPage,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
    isAdminView,
    setAdminView,
    createComponentOpen,
    setCreateComponentOpen,
    updateForm,
    setUpdateForm,
    callExtractAll,
    setCallExtractAll,
    dialogOpen,
    setDialogOpen,
    dialogContent,
    setDialogContent,
    updatePackage,
    setUpdatePackage,
    user,
    setUser,
    isAuthUser,
    setIsAuthUser,
  } = useContext(GlobalContext);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isVerified = useSearchParams().get("verified");
  const router = useRouter();
  const { register, handleSubmit } = form;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        data
      );

      if (res.status === 200) {
        toast.success("Logged in Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(true);
        setUser(res?.data?.data?.user);
        Cookies.set("token", res?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
        setComponentLevelLoader({ loading: false, id: "" });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(false);
        setComponentLevelLoader({ loading: false, id: "" });
      }
    } catch (e) {
      toast.error(e.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (isAuthUser) {
      console.log("routing page ... to", trackPage);
      setTimeout(() => {
        router.push(trackPage);
      }, [1000]);
    }
  }, [isAuthUser]);

  useEffect(() => {
    if (isVerified) {
      toast.success("Account Verified Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  return (
    <div className="container d-flex flex-column-reverse flex-md-row justify-content-between my-5 gap-5 align-items-center">
      <div className="register-container">
        <div className="register-text">
          <h4>Login To Leaf Holiday</h4>
          <p>Join to Leaf Holiday and book your favorite treks and tours.</p>
        </div>

        <form>
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
              <Button
                variant="success"
                className="flex-grow-1"
                onClick={handleSubmit(onSubmit)}>
                Login
              </Button>
              <Button variant="secondary" className="flex-grow-1">
                Cancel
              </Button>
            </div>
          </div>
        </form>
        <div className="register-router">
          <span className="d-flex mt-3">
            <p className="m-0">Don't Have An Account?</p>
            <span className="ms-2">
              <a href="/register">Register</a>
            </span>
          </span>
        </div>
      </div>
      <div className="register-image">
        <Image src="/images/login-page.png" width={537} height={350} />
      </div>
      <Notification />
    </div>
  );
}
