"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { GlobalContext } from "@/context";

export default function Pages() {
  const { setUpdatePageName } = useContext(GlobalContext);

  return (
    <div>
      <h1>Pages</h1>
      <div>
        <div>
          <p>Page Name</p>
        </div>
        <div className="d-flex justify-content-between ">
          <p>Home</p>
          <div className="d-flex">
            <Link href="/" target="_blank">
              View
            </Link>
            <Link
              href="/admin/pages/edit"
              onClick={() => setUpdatePageName("home")}>
              Edit
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <p>About Us</p>
          <div className="d-flex">
            <Link href="/aboutus" target="_blank">
              View
            </Link>
            <Link
              href="/admin/pages/edit"
              onClick={() => setUpdatePageName("aboutUs")}>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
