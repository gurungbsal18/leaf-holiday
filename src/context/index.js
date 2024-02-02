"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [componentLevelLoader, setComponentLevelLoader] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [isAdminView, setAdminView] = useState(false);
  const [createComponentOpen, setCreateComponentOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState(null);
  const [callExtractAll, setCallExtractAll] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [updatePackage, setUpdatePackage] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [updatePageName, setUpdatePageName] = useState(null);
  const [updatePageData, setUpdatePageData] = useState(null);
  const [bookingFormData, setBookingFormData] = useState(null);
  const [trackPage, setTrackPage] = useState("/");
  const [packageDetail, setPackageDetail] = useState(null);

  const pathname = usePathname();
  const extractAdminPath = pathname.split("/");

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      setTrackPage(pathname);
      console.log(trackPage);
    }
  }, [pathname]);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      const bookingData = JSON.parse(localStorage.getItem("bookingData")) || {};
      setUser(userData);
      setBookingFormData(bookingData);
    } else {
      setIsAuthUser(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);

  useEffect(() => {
    if (extractAdminPath[1] === "admin") {
      setAdminView(true);
    }
  }, [extractAdminPath]);
  return (
    <GlobalContext.Provider
      value={{
        componentLevelLoader,
        setComponentLevelLoader,
        pageLevelLoader,
        setPageLevelLoader,
        isAdminView,
        setAdminView,
        createComponentOpen,
        setCreateComponentOpen,
        updateForm,
        setUpdateForm,
        callExtractAll,
        setCallExtractAll,
        dialogOpen,
        setDialogOpen,
        dialogContent,
        setDialogContent,
        updatePackage,
        setUpdatePackage,
        user,
        setUser,
        isAuthUser,
        setIsAuthUser,
        updatePageName,
        setUpdatePageName,
        updatePageData,
        setUpdatePageData,
        bookingFormData,
        setBookingFormData,
        trackPage,
        setTrackPage,
        packageDetail,
        setPackageDetail,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
