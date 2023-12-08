"use client";

import { GlobalContext } from "@/context";
import React, { useContext } from "react";
import AdminNavbar from "../AdminNavbar";
import ClientNavbar from "../ClientNavbar";

export default function Navbar() {
  const { isAdminView } = useContext(GlobalContext);
  return <div>{isAdminView ? <AdminNavbar /> : <ClientNavbar />}</div>;
}
