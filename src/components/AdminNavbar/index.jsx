"use client";

import React, { useState } from "react";
import Image from "next/image";
import { adminNavItems } from "@/utils";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function AdminNavbar() {
  const [showNavText, setNavText] = useState(false);
  return (
    <div className="admin-navbar d-flex flex-column p-4 border-end h-100 ">
      <div className="brand mb-5">
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
      <div className="admin-navItems d-flex flex-column  gap-4">
        <button onClick={() => setNavText(!showNavText)}>
          {showNavText ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
        {adminNavItems.map((item) => (
          <div className="nav-item d-flex gap-2  " key={item.id}>
            <div className="nav-icon">{item.icon}</div>
            <div className={`nav-label ${showNavText ? "" : "d-none"}`}>
              <a href={item.path}>{item.label}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
