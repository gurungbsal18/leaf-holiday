"use client";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import { GlobalContext } from "@/context";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useState } from "react";
import { toast } from "react-toastify";

function Token({ setToken }) {
  const token = useSearchParams().get("token");
  setToken(token);

  return <></>;
}

export default function ResetPassword() {
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const data = { token: token, password: password };
    setComponentLevelLoader(true);
    try {
      const res = await axios.post(
        "https://leaf-backend.sushilbalami.com.np/auth/passwordReset",
        data
      );
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
      <Suspense>
        <Token setToken={setToken} />
      </Suspense>
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
