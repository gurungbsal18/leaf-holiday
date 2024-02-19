"use client";
import React, { useContext, useState } from "react";
import CreateTestimonial from "../CreateComponents/CreateTestimonial";
import CreateItinerary from "../CreateComponents/CreateItinerary";
import CreateDepartureDate from "../CreateComponents/CreateDepartureDate";
import CreateFAQ from "../CreateComponents/CreateFAQ";
import UploadGallery from "../ui/UploadGallery";
import EditPackage from ".";
import { GlobalContext } from "@/context";

export default function CallAllEdits() {
  const { dialogOpen, setDialogOpen, dialogContent, setDialogContent } =
    useContext(GlobalContext);
  const reviewData = {
    pageName: "Reviews",
    headerData: [
      { Header: "NAME", accessor: "userName" },
      { Header: "PACKAGE", accessor: "packageId.name" },
      { Header: "COMMENT", accessor: "comment" },
      { Header: "RATING", accessor: "stars" },
    ],
    createComponent: <CreateTestimonial />,
    titles: ["NAME", "COMMENT", "RATING"],
    apiName: "review",
  };
  const itineraryData = {
    headerData: [
      { Header: "TITLE", accessor: "title" },
      { Header: "MAX ALTITUDE", accessor: "maxAltitude" },
      { Header: "MEALS", accessor: "meals" },
      { Header: "ACCOMODATION", accessor: "accomodation" },
    ],
    pageName: "Itineraries",
    createComponent: <CreateItinerary />,
    titles: ["TITLE", "MAX ALTITUDE", "MEALS", "ACCOMODATION"],
    apiName: "itineraries",
  };
  const departureDateData = {
    headerData: [
      { Header: "START DATE", accessor: "startDate" },
      { Header: "END DATE", accessor: "endDate" },
      { Header: "STATUS", accessor: "isAvailable" },
      { Header: "PRICE", accessor: "price" },
    ],
    pageName: "Departure Dates",
    createComponent: <CreateDepartureDate />,
    titles: ["START DATE", "END DATE", "STATUS", "PRICE"],
    apiName: "departureDate",
  };
  const faqData = {
    headerData: [
      { Header: "QUESTION", accessor: "question" },
      { Header: "ANSWER", accessor: "answer" },
    ],
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
