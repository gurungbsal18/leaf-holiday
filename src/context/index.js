"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "@/utils/axios";

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
  const [homePageEdit, setHomePageEdit] = useState(null);
  const [verify, setVerify] = useState(false);
  const [destinationList, setDestinationList] = useState(null);

  const pathname = usePathname();
  const extractAdminPath = pathname.split("/");

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      setTrackPage(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token !== undefined) {
      setIsAuthUser(true);
      axios.defaults.headers.Authorization = `Bearer ${token}`;
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
      setVerify(false);
    }
    if (!pathname.includes("/booking")) {
      localStorage.setItem("bookingData", null);
    }
  }, [pathname]);
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
        homePageEdit,
        setHomePageEdit,
        verify,
        setVerify,
        destinationList,
        setDestinationList,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
