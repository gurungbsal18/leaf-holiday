"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [componentLevelLoader, setComponentLevelLoader] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [isAdminView, setAdminView] = useState(false);

  const pathname = usePathname();
  const extractAdminPath = pathname.split("/");

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
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
