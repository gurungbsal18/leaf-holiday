"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function ForgotYourPassword() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  setPageLevelLoader(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.post("/auth/passwordResetRequest", {
        email: email,
      });
      if (res.status === 200) {
        toast.success(
          res?.data?.message || "Something went wrong. Please try again !!!",
          { position: toast.POSITION.TOP_RIGHT }
        );
      } else {
        toast.error(
          res?.message || "Something went wrong. Please try again !!!",
          { position: toast.POSITION.TOP_RIGHT }
        );
      }
      setPageLevelLoader(false);
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          "Something went wrong. Please try again !!!",
        { position: toast.POSITION.TOP_RIGHT }
      );
      setPageLevelLoader(false);
    }
  };

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div>
          <div>
            <h4>Forgot Your Password</h4>
          </div>
          <div>
            <label htmlFor="email">
              Please Enter Your Email To Get Password Reset Link
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </>
  );
}
