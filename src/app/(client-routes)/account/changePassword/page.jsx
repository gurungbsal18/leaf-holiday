"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import axios from "@/utils/axios";

export default function ChangePassword() {
  const { user, pageLevelLoader, setPageLevelLoader } =
    useContext(GlobalContext);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const { register, watch, handleSubmit } = useForm({
    defaultValues: user || {},
  });

  const handleChangePassword = async (data) => {
    setPageLevelLoader(true);
    try {
      const res = await axios.put(`/user/update/${data._id}`, data);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        toast.success("Password Changed successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    setPageLevelLoader(false);
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="col-9 px-2 mt-2">
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
                  className="btn btn-sm btn-success">
                  CHANGE PASSWORD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
