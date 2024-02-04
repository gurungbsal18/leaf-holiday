"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { adminNavItems } from "@/utils";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";

export default function AdminNavbar() {
  const { setPageLevelLoader } = useContext(GlobalContext);
  const [showNavText, setNavText] = useState(true);
  const router = useRouter();
  return (
    <div className="admin-navbar bg-success d-flex flex-column p-4 border-end">
      {/* <div className="brand">
        <a href="/">
          <Image
            src="/images/logo.png"
            width={showNavText ? 150 : 38}
            height={showNavText ? 59 : 15}
            alt="leaf-holiday-logo"
            priority={true}
          />
        </a>
      </div> */}
      <div className="admin-nav-items d-flex flex-column gap-4">
        <span
          role="button"
          className="text-white"
          onClick={() => setNavText(!showNavText)}>
          {showNavText ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </span>
        {adminNavItems.map((item) => (
          <div
            onClick={() => {
              setPageLevelLoader(true);
              router.push(item.path);
            }}
            className="nav-item d-flex gap-2"
            key={item.id}>
            <div className="nav-icon">{item.icon}</div>
            <p className={`nav-label m-0 ${showNavText ? "" : "d-none"}`}>
              {item.label}
            </p>
          </div>
        ))}
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
  );
}
