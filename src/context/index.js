"use client";

import { usePathname, useRouter } from "next/navigation";
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

  const pathname = usePathname();
  const extractAdminPath = pathname.split("/");
  const router = useRouter();

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
      localStorage.clear();
      setIsAuthUser(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setPageLevelLoader(true);
    if (pathname !== "/login" && pathname !== "/register") {
      setTrackPage(pathname);
    }
    if (extractAdminPath[1] === "admin") {
      setVerify(false);
      if (!userData) {
        setTrackPage("/");
        router.push("/login");
      }
      if (userData && userData.role !== "admin") {
        router.push("/");
      }
    }
    if (!pathname.includes("/booking")) {
      localStorage.setItem("bookingData", null);
    }
    if (!pathname.includes("/create-package")) {
      localStorage.removeItem("updatePackage");
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
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
