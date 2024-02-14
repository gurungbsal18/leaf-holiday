"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaUser, FaHistory, FaKey } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";

export default function ClientAccountNavbar() {
  const router = useRouter();
  const { setUser, setIsAuthUser } = useContext(GlobalContext);
  function handleLogout() {
    toast.success("Logged Out Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      setUser(null);
      Cookies.remove("token");
      localStorage.clear();
      setIsAuthUser(false);
      router.push("/login");
    }, 1000);
  }
  const mapHelper = [
    {
      id: "userInformation",
      path: "/account",
      label: "User Information",
      icon: <FaUser />,
    },
    {
      id: "history",
      path: "/account/history",
      label: "Order History",
      icon: <FaHistory />,
    },
    {
      id: "changePassword",
      path: "/account/changePassword",
      label: "Change Password",
      icon: <FaKey />,
    },
  ];

  return (
    <div className="d-flex flex-column bg-light col p-4 vh-100 gap-4">
      {mapHelper.map((item) => (
        <div
          className="d-flex justify-content-between align-items-center user-account-dashboard-item"
          key={item.id}
          onClick={() => router.push(item.path)}>
          <div className="d-flex gap-2 align-items-center">
            {item.icon}
            <p className="m-0">{item.label}</p>
          </div>
          <MdArrowForwardIos />
        </div>
      ))}
      <div
        className="d-flex gap-2 border-top pt-3 logout-btn"
        onClick={handleLogout}>
        <LogoutIcon className="text-success" />
        <p className="m-0 text-success">Log Out</p>
      </div>
    </div>
  );
}
