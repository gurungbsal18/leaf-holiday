"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { FaUser, FaHistory, FaKey } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import Link from "next/link";

export default function ClientAccountNavbar() {
  const pathName = usePathname();
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
    <div className="col-3 d-flex flex-column bg-success-subtle col p-4 vh-100 gap-4">
      {mapHelper.map((item) => (
        <Link
          className={`d-flex justify-content-between align-items-center user-account-dashboard-item ${
            pathName === item.path ? "text-success" : "text-dark"
          }`}
          key={item.id}
          href={item.path}>
          <div className="d-flex gap-2 align-items-center">
            {item.icon}
            <p className="m-0">{item.label}</p>
          </div>
          <MdArrowForwardIos />
        </Link>
      ))}
      <div
        className="d-flex gap-2 border-top logout-btn bg-success align-items-center p-2 rounded"
        onClick={handleLogout}>
        <LogoutIcon className="text-light" />
        <p className="m-0 text-light">Log Out</p>
      </div>
    </div>
  );
}
