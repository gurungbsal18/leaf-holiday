"use client";

import { packageNavItems, pkgDetail } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookingCard from "@/components/BookingCard";
import { CalendarMonth } from "@mui/icons-material";
import SelectComponent from "@/components/FormElements/SelectComponent";
import DateTable from "@/components/DateTable";

const PackageDetail = () => {
  const [showItineraryDetails, setShowItineraryDetails] = useState({});
  const [expandOrCollapse, setExpandOrCollapse] = useState(false);
  const [showCostInclude, setShowConstInclude] = useState(true);

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
    <div className="main-div">
      <div>
        <Image
          src={pkgDetail.headerImage}
          width={1519}
          height={800}
          alt="header image"
        />
      </div>
      <div className="d-flex justify-content-between ">
        <h5>{pkgDetail.headerTitle}</h5>
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
      <div className="content-div d-flex gap-5 ">
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
            <h5>{pkgDetail.overviewTitle}</h5>
            <p>{pkgDetail.overviewContent}</p>
            <Button>Read More</Button>
          </div>
          <div>
            <div className="d-flex   justify-content-between ">
              <h5>Itinerary</h5>
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
            <div className="cost-IE-container">
              <div className="cost-IE-header">
                <Button onClick={() => setShowConstInclude(true)}>
                  Cost Include
                </Button>
                <Button onClick={() => setShowConstInclude(false)}>
                  Cost Exclude
                </Button>
              </div>
              <div className="const-IE-content">
                <ul>
                  {showCostInclude
                    ? pkgDetail.costInclude.map((item) => (
                        <li key={item.id}>{item.content}</li>
                      ))
                    : pkgDetail.costExclude.map((item) => (
                        <li key={item.id}>{item.content}</li>
                      ))}
                </ul>
              </div>
            </div>
            <div className="map-container">
              <h5>Trip Map</h5>
              <div className="map-image">
                <Image
                  src={pkgDetail.mapImage}
                  width={611}
                  height={897}
                  alt="map"
                />
              </div>
            </div>
            <div className="date-price-container" id="date-price">
              <h5>
                <CalendarMonth />
                Dates & Price
              </h5>
              <SelectComponent
                options={[
                  { id: 1, label: "June 2023" },
                  { id: 2, label: "July 2023" },
                ]}
              />
              <DateTable />
            </div>
          </div>
        </div>
        <div className="booking-card w-100 ">
          <BookingCard price={1290} />
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
