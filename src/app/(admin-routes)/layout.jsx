"use client";
import AdminNavbar from "@/components/AdminNavbar";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";

export default function AdminLayout({ children }) {
  const { dialogOpen, dialogContent } = useContext(GlobalContext);
  return (
    <div className="">
      <div className="d-flex">
        <AdminNavbar />
        <div className="admin-main-container">{children}</div>

        <Dialog open={dialogOpen} className="custom-dialog">
          {dialogContent}
        </Dialog>

        <Notification />
      </div>
    </div>
  );
}
