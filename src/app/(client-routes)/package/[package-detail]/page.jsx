"use client";

import { packageNavItems } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import MapIcon from "@mui/icons-material/Map";
import BookingCard from "@/components/BookingCard";
import { CalendarMonth } from "@mui/icons-material";
import DateTable from "@/components/DateTable";
import { Container } from "react-bootstrap";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HikingIcon from "@mui/icons-material/Hiking";
import TerrainIcon from "@mui/icons-material/Terrain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { GiMeal } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";

const PackageDetail = () => {
  const [showItineraryDetails, setShowItineraryDetails] = useState({});
  const [expandOrCollapse, setExpandOrCollapse] = useState(false);
  const [showCostInclude, setShowConstInclude] = useState(true);
  const [activeCost, setActiveCost] = useState(true);
  const [contentExpand, setContentExpand] = useState(false);
  const packageId = usePathname().replace("/package/", "");
  const [packageDetail, setPackageDetail] = useState(null);

  const getPackageDetail = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/package/${packageId}`
      );
      setPackageDetail(res.data.data);
    } catch (e) {
      toast.error(e.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const iconMapping = {
    duration: <CalendarMonthIcon />,
    difficulty: <HikingIcon />,
    maxAltitude: <TerrainIcon />,
    bestWeater: <ThunderstormIcon />,
    meals: <GiMeal />,
    accomodation: <FaBed />,
    transportation: <FaCar />,
    group: <MdGroups />,
  };

  useEffect(() => {
    if (packageDetail) {
      if (
        Object.keys(showItineraryDetails).length ===
        packageDetail.itineraries.length
      ) {
        setExpandOrCollapse(
          Object.values(showItineraryDetails).every((value) => value)
        );
      }
    }
  }, [showItineraryDetails]);

  const handleToggle = (id) => {
    setShowItineraryDetails((prevShowItineraryDetails) => ({
      ...prevShowItineraryDetails,
      [id]: !prevShowItineraryDetails[id],
    }));
  };

  const handleExpandCollapse = () => {
    packageDetail.itineraries.map((item) =>
      setShowItineraryDetails((prevShowItineraryDetails) => ({
        ...prevShowItineraryDetails,
        [item.id]: expandOrCollapse ? false : true,
      }))
    );
  };

  const readMoreBtn = () => {
    setContentExpand(!contentExpand);
  };

  useEffect(() => {
    getPackageDetail();
  }, []);
  packageDetail;

  return (
    <>
      {packageDetail ? (
        <div className="main-div">
          <div className="single-trip-hero">
            <Image
              src={packageDetail.mainImageUrl}
              width={1519}
              height={800}
              alt="header image"
            />

            <div className="container d-flex justify-content-center">
              <div className="container d-flex justify-content-between flex-column flex-md-row single-trip-hero-title">
                <h1 className="single-trip-title mb-0">{packageDetail.name}</h1>
                <div className="d-flex gap-2">
                  <Button variant="success" size="sm">
                    Book Now
                  </Button>
                  <Button variant="outline-light" size="sm">
                    Send Inquiry
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-success-subtle">
            <div className="container d-flex gap-5 single-trip-nav px-3 px-md-0">
              {packageNavItems.map((item) => (
                <a key={item.id} href={item.path}>
                  <span className="text-muted fs-12">{item.icon}</span>{" "}
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <Container className="single-trip p-auto p-md-0">
            <div className="row content-div p-auto p-md-0">
              <div className="col-12 col-lg-9 pt-3">
                <div className="row d-flex gap-5 trip-fact my-4">
                  {Object.entries(packageDetail.tripFacts).map(
                    ([key, value]) => (
                      <div key={value.id} className="col d-flex">
                        <div className="trip-fact-icon">
                          {iconMapping[value.id]}
                        </div>
                        <div>
                          <p className="trip-fact-title m-0 text-muted">
                            {value.label}
                          </p>
                          <p className="trip-fact-detail m-0">{value.info}</p>
                        </div>
                      </div>
                    )
                  )}
                  <div className="col d-flex">
                    <div className="trip-fact-icon">
                      {iconMapping["difficulty"]}
                    </div>
                    <div>
                      <p className="trip-fact-title m-0 text-muted">
                        Difficulty
                      </p>
                      <p className="trip-fact-detail m-0">
                        {packageDetail.difficulty.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div id="overview">
                  <h4 className="title">
                    Experience The Allure Of {packageDetail.name}
                  </h4>
                  {/* <div className="overview-content-collapse overview-content-expand"> */}
                  <div
                    className={`${
                      contentExpand
                        ? "overview-content-expand"
                        : "overview-content-collapse"
                    }`}>
                    <p>{packageDetail.overview}</p>
                  </div>
                  <Button size="sm" variant="success" onClick={readMoreBtn}>
                    {contentExpand ? "Read Less" : "Read More"}
                  </Button>
                </div>
                <div className="mt-5" id="itinerary">
                  <div className="d-flex justify-content-between mb-3">
                    <h4 className="title">
                      <ModeOfTravelIcon />
                      Itinerary
                    </h4>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleExpandCollapse}>
                      {expandOrCollapse ? "Collapse All -" : "Expand All +"}
                    </Button>
                  </div>
                  <div className="d-flex gap-3 flex-column">
                    {packageDetail.itineraries.map((item) => (
                      <div key={item._id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="d-flex align-items-center gap-2">
                            <span className="text-success">
                              <LocationOnIcon />
                            </span>
                            <p className="m-0 itinerary-title text-success">
                              {item.title}
                            </p>
                          </span>

                          <Button
                            variant="success"
                            size="sm"
                            className="itinerary-expand-btn"
                            onClick={() => handleToggle(item.id)}>
                            {showItineraryDetails[item.id] ? "-" : "+"}
                          </Button>
                        </div>
                        <div
                          className={`${
                            showItineraryDetails[item.id] ? "" : "d-none "
                          }`}>
                          <Image
                            src={item.imageUrl}
                            height={500}
                            width={500}
                            alt={`${item.name}-image`}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="cost-IE-container mt-5"
                    id="costInclueExclude">
                    <div className="cost-IE-header d-flex align-items-center gap-2">
                      <div
                        size="sm"
                        className={`d-flex align-items-center ${
                          activeCost
                            ? "btn btn-sm btn-success"
                            : "btn btn-sm btn-outline-success"
                        }`}
                        onClick={() => {
                          setShowConstInclude(true);
                          setActiveCost(true);
                        }}>
                        <span className="me-1">
                          <CheckCircleOutlineIcon fontSize="small" />
                        </span>
                        Cost Include
                      </div>
                      <div
                        size="sm"
                        className={`d-flex align-items-center ${
                          activeCost
                            ? "btn btn-sm btn-outline-danger"
                            : "btn btn-sm btn-danger"
                        }`}
                        onClick={() => {
                          setShowConstInclude(false);
                          setActiveCost(false);
                        }}>
                        <span className="me-1">
                          <CancelIcon fontSize="small" />
                        </span>
                        Cost Exclude
                      </div>
                    </div>
                    <div className="const-IE-content mt-1 mt-md-3">
                      <ul>
                        {showCostInclude
                          ? packageDetail.inclusions.map((item, index) => (
                              <li key={`${item}-${index}`}>
                                <CheckCircleOutlineIcon
                                  className="text-success"
                                  fontSize="small"
                                />
                                {item}
                              </li>
                            ))
                          : packageDetail.exclusions.map((item, index) => (
                              <li key={`${item}-${index}`}>
                                <CancelIcon
                                  className="text-danger"
                                  fontSize="small"
                                />
                                {item}
                              </li>
                            ))}
                      </ul>
                    </div>
                  </div>
                  <div className="map-container mt-5" id="map">
                    <h4 className="title">
                      <MapIcon />
                      Trip Map
                    </h4>
                    <div className="map-image">
                      <Image
                        src={packageDetail.tripMapUrl}
                        width={611}
                        height={897}
                        alt="map"
                      />
                    </div>
                  </div>
                  <div className="date-price-container mt-5" id="date-price">
                    <h4 className="title">
                      <CalendarMonth />
                      Dates & Price
                    </h4>

                    <DateTable />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 booking-card pt-4">
                <BookingCard price={1290} />
              </div>
            </div>
          </Container>
          <Notification />
        </div>
      ) : (
        <PageLevelLoader loading={true} />
      )}
    </>
  );
};

export default PackageDetail;
