"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { GlobalContext } from "@/context";
import React, { useContext } from "react";

export default function Menu() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  setPageLevelLoader(false);
  return <>{pageLevelLoader ? <PageLevelLoader /> : <div></div>}</>;
}
