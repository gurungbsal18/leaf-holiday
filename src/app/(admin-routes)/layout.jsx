"use client";
import AdminNavbar from "@/components/AdminNavbar";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";

export default function AdminLayout({ children }) {
  const { dialogOpen, dialogContent } = useContext(GlobalContext);
  return (
    <div className="d-flex main-container">
      <AdminNavbar />
      {children}

      <Dialog open={dialogOpen} className="custom-dialog">
        {dialogContent}
      </Dialog>

      <Notification />
    </div>
  );
}
