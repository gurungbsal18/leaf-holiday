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
  function handleLogout() {
    toast.success("Logged Out Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/login");
  }
  return (
    <div className="d-flex flex-column ">
      {mapHelper.map((item) => (
        <div
          className="d-flex justify-content-between"
          key={item.id}
          onClick={() => router.push(item.path)}>
          <div className="d-flex gap-3">
            {item.icon}
            <p>{item.label}</p>
          </div>
          <MdArrowForwardIos />
        </div>
      ))}
      <div className="d-flex" onClick={handleLogout}>
        <LogoutIcon />
        <p>Log Out</p>
      </div>
    </div>
  );
}
