import AboutUsPage from "@/components/ClientPages/AboutUsPage";
import axios from "@/utils/axios";
import React from "react";

export const metadata = {
  title: "About Us | Leaf Holiday",
  description: "...",
};

export default async function AboutUs() {
  setTimeout(() => {}, 2000);
  const res = await axios.get(`/aboutUs/`);
  const aboutUsData = res?.data?.data[0];
  return <>{aboutUsData && <AboutUsPage aboutUsData={aboutUsData} />}</>;
}
