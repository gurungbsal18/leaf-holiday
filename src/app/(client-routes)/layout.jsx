"use client";
import ClientNavbar from "@/components/ClientNavbar";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { GlobalContext } from "@/context";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";

export default function ClientLayout({ children }) {
  const { dialogOpen, dialogContent } = useContext(GlobalContext);
  return (
    <div className="">
      <ClientNavbar />
      <div className="main-container">{children}</div>
      <Footer />

      <Dialog open={dialogOpen}>{dialogContent}</Dialog>

      <Notification />
      <ScrollToTop />
    </div>
  );
}
