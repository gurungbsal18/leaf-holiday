"use client";

import { loginFormControls } from "@/utils";
import React, { Suspense, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "@/context";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import axios from "@/utils/axios";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function IsVerified() {
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified");
  useEffect(() => {
    if (isVerified) {
      toast.success("Account Verified Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  return <></>;
}
export default function Login() {
  const {
    trackPage,
    componentLevelLoader,
    setComponentLevelLoader,
    setUser,
    isAuthUser,
    setIsAuthUser,
  } = useContext(GlobalContext);

  const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const isNotDisabled = watch("email") !== "" && watch("password") !== "";

  const onSubmit = async (data) => {
    setComponentLevelLoader(true);
    try {
      const res = await axios.post(`/auth/login`, data);

      if (res.status === 200) {
        toast.success("Logged in Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(true);
        setUser(res?.data?.data?.user);
        Cookies.set("token", res?.data?.data?.token);
        axios.defaults.headers.Authorization = `Bearer ${res?.data?.data?.token}`;
        localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
        setComponentLevelLoader(false);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(false);
        setComponentLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
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
        router.push(trackPage);
      }, [1000]);
    }
  }, [isAuthUser]);

  return (
    <div className="container d-flex flex-column-reverse flex-md-row justify-content-between my-5 gap-5 align-items-center">
      <Suspense>
        <IsVerified />
      </Suspense>
      <div className="register-container">
        <div className="register-text">
          <h4>Login To Leaf Holiday</h4>
          <p>Join to Leaf Holiday and book your favorite treks and tours.</p>
        </div>

        <form>
          <div className="form-container d-flex flex-column gap-3">
            {loginFormControls.map((formControl) => (
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
                {errors[formControl?.id] && (
                  <p className="text-danger">
                    {errors[formControl.id]?.message}
                  </p>
                )}
              </>
            ))}

            <div className="d-flex gap-2">
              <Button
                disabled={!isNotDisabled}
                variant="success"
                className="flex-grow-1"
                onClick={handleSubmit(onSubmit)}>
                {componentLevelLoader ? (
                  <ComponentLevelLoader text={"Logging In"} />
                ) : (
                  "Login"
                )}
              </Button>
              <Button variant="secondary" className="flex-grow-1">
                Cancel
              </Button>
            </div>
          </div>
        </form>
        <div className="register-router">
          <span className="d-flex mt-3">
            <p className="m-0">Don&apos;t Have An Account?</p>
            <span className="ms-2">
              <Link href="/register">Register</Link>
            </span>
          </span>
          <span className="d-flex mt-3">
            <span className="ms-2">
              <Link href="/forgot-password">Forgot Your Password?</Link>
            </span>
          </span>
        </div>
      </div>
      <div className="register-image">
        <Image
          src="/images/login-page.png"
          width={537}
          height={350}
          alt="login-image"
        />
      </div>
    </div>
  );
}
