"use client";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import { GlobalContext } from "@/context";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);
  const token = usePathname().replace("/resetPassword/", "");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const data = { token: token, password: password };
    setComponentLevelLoader(true);
    try {
      const res = await axios.post("/auth/passwordReset", data);
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
      setComponentLevelLoader(false);
    } catch (e) {
      console.log(e);
      toast.error(
        e?.response?.data?.error ||
          "Something went wrong. Please try again !!!",
        { position: toast.POSITION.TOP_RIGHT }
      );
      setComponentLevelLoader(false);
    }
  };
  return (
    <div>
      <div>
        <h4>Reset Password</h4>
      </div>
      <div>
        <label htmlFor="password">Enter The New Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>
        {componentLevelLoader ? (
          <ComponentLevelLoader text={"Resetting Password"} />
        ) : (
          "Reset"
        )}
      </button>
    </div>
  );
}
