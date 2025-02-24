"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { adminNavItems } from "@/utils";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function AdminNavbar() {
  const { setUser, setIsAuthUser, setPageLevelLoader } =
    useContext(GlobalContext);
  let activeNav = "";
  const pathName = usePathname();
  if (pathName !== "/admin") {
    activeNav = pathName.match(/admin\/([^\/]*)/)[1];
  }
  const [showNavText, setNavText] = useState(true);
  const router = useRouter();

  function handleLogout() {
    toast.success("Logged Out Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setPageLevelLoader(true);
    setTimeout(() => {
      setUser(null);
      Cookies.remove("token");
      localStorage.clear();
      setIsAuthUser(false);
      router.push("/login");
    }, 1000);
  }

  return (
    <div className="position-relative">
      <div className="admin-navbar bg-success-subtle d-flex flex-column p-4 border-end">
        <div className="admin-nav-items d-flex flex-column gap-4">
          <span
            role="button"
            className="text-dark"
            onClick={() => setNavText(!showNavText)}
          >
            {showNavText ? (
              <KeyboardDoubleArrowLeftIcon />
            ) : (
              <KeyboardDoubleArrowRightIcon />
            )}
          </span>
          {adminNavItems.map((item) => (
            <div
              onClick={() => {
                if (activeNav !== item.path) {
                  setPageLevelLoader(true);
                }
                router.push(`/admin/${item.path}`);
              }}
              className="nav-item d-flex gap-2"
              key={item.id}
            >
              {/* <div className="nav-icon">{item.icon}</div> */}
              <div
                className={`nav-icon ${
                  activeNav === item.path ? "text-success" : "text-muted"
                }`}
              >
                {item.icon}
              </div>
              <p
                className={`nav-label m-0 ${showNavText ? "" : "d-none"} ${
                  activeNav === item.path ? "text-success" : "text-muted"
                }`}
              >
                {item.label}
              </p>
            </div>
          ))}
          <div
            onClick={() => {
              // setPageLevelLoader(true);
              handleLogout();
            }}
            className="nav-item d-flex gap-2"
          >
            <div className="nav-icon">
              <LogoutIcon />
            </div>
            <p className={`nav-label m-0 ${showNavText ? "" : "d-none"}`}>
              Log Out
            </p>
          </div>
        </div>
        <div className="brand bg-white w-100">
          <a href="/">
            <Image
              src="/images/logo.png"
              width={showNavText ? 150 : 38}
              height={showNavText ? 59 : 15}
              alt="leaf-holiday-logo"
              priority={true}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
