"use client";
import React, { useContext, useState } from "react";
import CreateTestimonial from "../CreateComponents/CreateTestimonial";
import CreateItinerary from "../CreateComponents/CreateItinerary";
import CreateDepartureDate from "../CreateComponents/CreateDepartureDate";
import CreateFAQ from "../CreateComponents/CreateFAQ";
import UploadGallery from "../ui/UploadGallery";
import EditPackage from ".";
import dayjs from "dayjs";

export default function CallAllEdits() {
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
    showEdit: true,
    showRemove: true,
    sizeOfPage: 100,
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
    showEdit: true,
    showRemove: true,
    sizeOfPage: 100,
  };
  const departureDateData = {
    headerData: [
      {
        Header: "START DATE",
        accessor: "startDate",
        Cell: ({ value }) => dayjs(value).format("MMM DD, YYYY"),
      },
      {
        Header: "END DATE",
        accessor: "endDate",
        Cell: ({ value }) => dayjs(value).format("MMM DD, YYYY"),
      },
      {
        Header: "STATUS",
        accessor: "isAvailable",
        Cell: ({ value }) => {
          return (
            <button className={`${value ? "text-success" : "text-danger"}`}>
              {value ? "Available" : "Unavailable"}
            </button>
          );
        },
      },
      { Header: "PRICE", accessor: "pricePerPerson" },
    ],
    pageName: "Departure Dates",
    createComponent: <CreateDepartureDate />,
    titles: ["START DATE", "END DATE", "STATUS", "PRICE"],
    apiName: "departureDate",
    showEdit: true,
    showRemove: true,
    sizeOfPage: 100,
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
    showEdit: true,
    showRemove: true,
    sizeOfPage: 100,
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
