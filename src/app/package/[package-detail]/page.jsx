"use client";

import { packageNavItems, pkgDetail } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookingCard from "@/components/BookingCard";

const PackageDetail = () => {
  const [showItineraryDetails, setShowItineraryDetails] = useState({});

  const [expandOrCollapse, setExpandOrCollapse] = useState(false);

  useEffect(() => {
    if (
      Object.keys(showItineraryDetails).length === pkgDetail.itinerary.length
    ) {
      setExpandOrCollapse(
        Object.values(showItineraryDetails).every((value) => value)
      );
    }
  }, [showItineraryDetails]);

  const handleToggle = (id) => {
    setShowItineraryDetails((prevShowItineraryDetails) => ({
      ...prevShowItineraryDetails,
      [id]: !prevShowItineraryDetails[id],
    }));
  };

  const handleExpandCollapse = () => {
    pkgDetail.itinerary.map((item) =>
      setShowItineraryDetails((prevShowItineraryDetails) => ({
        ...prevShowItineraryDetails,
        [item.id]: expandOrCollapse ? false : true,
      }))
    );
  };

  return (
    <div className="">
      <div>
        <Image
          src={pkgDetail.headerImage}
          width={1519}
          height={800}
          alt="header image"
        />
      </div>
      <div className="d-flex justify-content-between ">
        <h3>{pkgDetail.headerTitle}</h3>
        <div className="">
          <Button>Book Now</Button>
          <Button>Send Inquiry</Button>
        </div>
      </div>

      <div className="bg-white d-flex gap-3 p-3">
        {packageNavItems.map((item) => (
          <a key={item.id} href={item.path}>
            {item.label}
          </a>
        ))}
      </div>
      <div className="d-flex gap-5 ">
        <div className="p-3">
          <div className="d-flex">
            {pkgDetail.packageInformation.map((item) => (
              <div key={item.id} className="d-flex">
                <div>{item.icon}</div>
                <div>
                  <p>{item.label}</p>
                  <p>{item.information}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3>{pkgDetail.overviewTitle}</h3>
            <p>{pkgDetail.overviewContent}</p>
            <Button>Read More</Button>
          </div>
          <div>
            <div className="d-flex   justify-content-between ">
              <h3>Itinerary</h3>
              <Button onClick={handleExpandCollapse}>
                {expandOrCollapse ? "Collapse All" : "Expand All"}
              </Button>
            </div>
            <div>
              {pkgDetail.itinerary.map((item) => (
                <div key={item.id}>
                  <div className="d-flex justify-content-between  ">
                    <span>
                      <LocationOnIcon />
                      {item.title}
                    </span>

                    <Button onClick={() => handleToggle(item.id)}>
                      {showItineraryDetails[item.id] ? "-" : "+"}
                    </Button>
                  </div>
                  <p
                    className={`${
                      showItineraryDetails[item.id] ? "" : "d-none "
                    }`}>
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-100 ">
          <BookingCard price={1290} />
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
