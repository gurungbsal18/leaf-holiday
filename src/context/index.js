"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [componentLevelLoader, setComponentLevelLoader] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  return (
    <GlobalContext.Provider
      value={{
        componentLevelLoader,
        setComponentLevelLoader,
        pageLevelLoader,
        setPageLevelLoader,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
