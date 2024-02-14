"use client";
import React, { useContext, useState } from "react";
import CreateTestimonial from "../CreateComponents/CreateTestimonial";
import CreateItinerary from "../CreateComponents/CreateItinerary";
import CreateDepartureDate from "../CreateComponents/CreateDepartureDate";
import CreateFAQ from "../CreateComponents/CreateFAQ";
import UploadGallery from "../ui/UploadGallery";
import EditPackage from ".";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "@/context";

export default function CallAllEdits() {
  const { dialogOpen, setDialogOpen, dialogContent, setDialogContent } =
    useContext(GlobalContext);
  const reviewData = {
    pageName: "Reviews",
    createComponent: <CreateTestimonial />,
    titles: ["NAME", "COMMENT", "RATING"],
    apiName: "review",
  };
  const itineraryData = {
    pageName: "Itineraries",
    createComponent: <CreateItinerary />,
    titles: ["TITLE", "MAX ALTITUDE", "MEALS", "ACCOMODATION"],
    apiName: "itineraries",
  };
  const departureDateData = {
    pageName: "Departure Dates",
    createComponent: <CreateDepartureDate />,
    titles: ["START DATE", "END DATE", "STATUS", "PRICE"],
    apiName: "departureDate",
  };
  const faqData = {
    pageName: "FAQ",
    createComponent: <CreateFAQ />,
    titles: ["QUESTION", "ANSWER"],
    apiName: "faq",
  };

  return (
    <div>
      <UploadGallery />
      <EditPackage data={reviewData} />
      <EditPackage data={itineraryData} />
      <EditPackage data={departureDateData} />
      <EditPackage data={faqData} />
    </div>
  );
}
