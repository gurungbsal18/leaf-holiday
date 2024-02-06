"use client";

import { packageNavItems } from "@/utils";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import MapIcon from "@mui/icons-material/Map";
import BookingCard from "@/components/BookingCard";
import { CalendarMonth } from "@mui/icons-material";
import { Container } from "react-bootstrap";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HikingIcon from "@mui/icons-material/Hiking";
import TerrainIcon from "@mui/icons-material/Terrain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { GiMeal } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import dayjs from "dayjs";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import RouteIcon from "@mui/icons-material/Route";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { GlobalContext } from "@/context";
import { isImage } from "@/utils/functions";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export default function PackageDetail() {
  const [showItineraryDetails, setShowItineraryDetails] = useState({});
  const [expandOrCollapse, setExpandOrCollapse] = useState(false);
  const [showCostInclude, setShowConstInclude] = useState(true);
  const [activeCost, setActiveCost] = useState(true);
  const [contentExpand, setContentExpand] = useState(false);
  const packageId = usePathname().replace("/package/", "");

  const {
    user,
    setBookingFormData,
    isAuthUser,
    pageLevelLoader,
    setPageLevelLoader,
    packageDetail,
    setPackageDetail,
  } = useContext(GlobalContext);

  const router = useRouter();

  const getPackageDetail = async () => {
    try {
      setPageLevelLoader(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/package/${packageId}`
      );
      if (res.status === 200) {
        setPackageDetail(res.data.data);
        setPageLevelLoader(false);
      }
    } catch (e) {
      setPageLevelLoader(false);
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
        packageDetail?.itineraries.length
      ) {
        setExpandOrCollapse(
          Object.values(showItineraryDetails).every((value) => value)
        );
      }
    }
  }, [showItineraryDetails, packageDetail]);

  const handleToggle = (id) => {
    setShowItineraryDetails((prevShowItineraryDetails) => ({
      ...prevShowItineraryDetails,
      [id]: !prevShowItineraryDetails[id],
    }));
  };

  const handleExpandCollapse = () => {
    packageDetail?.itineraries.map((item) =>
      setShowItineraryDetails((prevShowItineraryDetails) => ({
        ...prevShowItineraryDetails,
        [item._id]: expandOrCollapse ? false : true,
      }))
    );
  };
  console.log(showItineraryDetails);
  const readMoreBtn = () => {
    setContentExpand(!contentExpand);
  };

  useEffect(() => {
    getPackageDetail();
    console.log("called useeffect");
  }, []);

  const handleBook = () => {
    if (!isAuthUser) {
      toast.error("Please Login To Book The Package", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setBookingFormData({
        userId: user?._id,
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: "",
        country: "",
        noOfChildren: 0,
        tripDate: dayjs(new Date().toDateString()),
        noOfGuests: 1,
        total: packageDetail?.prices[0]?.price,
        message: "",
      });
      setTimeout(() => {
        router.push(`/package/${packageDetail?._id}/booking`);
      }, 1000);
    }
  };
  const handleInquiry = () => {
    if (!isAuthUser) {
      toast.error("Please Login To Send An Inquiry", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setTimeout(() => {
        router.push(`/package/${packageDetail?._id}/inquiry`);
      }, 1000);
    }
  };

  console.log("package details: ", packageDetail);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : (
        <div className="main-div">
          <div className="single-trip-hero">
            <Image
              src={packageDetail?.mainImageUrl}
              width={1519}
              height={800}
              alt="header image"
            />

            <div className="container d-flex justify-content-center">
              <div className="container d-flex justify-content-between flex-column flex-md-row single-trip-hero-title">
                <h1 className="single-trip-title mb-0">
                  {packageDetail?.name}
                </h1>
                <div className="d-flex gap-2">
                  <Button variant="success" size="sm" onClick={handleBook}>
                    Book Now
                  </Button>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={handleInquiry}
                  >
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
                {packageDetail?.tripFacts.length !== 0 && (
                  <div className="row d-flex gap-5 trip-fact my-4">
                    {packageDetail?.tripFacts &&
                      Object?.entries(packageDetail?.tripFacts).map(
                        ([key, value]) => {
                          if (value.info !== "" && value.info !== 0) {
                            return (
                              <div key={value.id} className="col d-flex">
                                <div className="trip-fact-icon">
                                  {iconMapping[value.id]}
                                </div>
                                <div>
                                  <p className="trip-fact-title m-0 text-muted">
                                    {value.label}
                                  </p>
                                  <p className="trip-fact-detail m-0">
                                    {value.info}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        }
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
                          {packageDetail?.difficulty.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {packageDetail?.overview !== "" && (
                  <div id="overview">
                    <h4 className="title">
                      Experience The Allure Of {packageDetail?.name}
                    </h4>
                    {/* <div className="overview-content-collapse overview-content-expand"> */}
                    <div
                      className={`${
                        contentExpand
                          ? "overview-content-expand"
                          : "overview-content-collapse"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: packageDetail?.overview,
                      }}
                    ></div>
                    <Button size="sm" variant="success" onClick={readMoreBtn}>
                      {contentExpand ? "Read Less" : "Read More"}
                    </Button>
                  </div>
                )}
                {packageDetail?.itineraries.length !== 0 && (
                  <div className="mt-5" id="itinerary">
                    <div className="d-flex justify-content-between mb-3 align-items-center">
                      <h4 className="title ">
                        <ModeOfTravelIcon />
                        Itinerary
                      </h4>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleExpandCollapse}
                      >
                        {expandOrCollapse ? "Collapse All -" : "Expand All +"}
                      </Button>
                    </div>
                    <div className="d-flex gap-3 flex-column">
                      {packageDetail?.itineraries.map((item) => (
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
                              onClick={() => handleToggle(item._id)}
                            >
                              {showItineraryDetails[item._id] ? "-" : "+"}
                            </Button>
                          </div>
                          <div
                            className={`${
                              showItineraryDetails[item._id] ? "" : "d-none "
                            }`}
                          >
                            <Image
                              src={item.imageUrl}
                              height={500}
                              width={500}
                              alt={`${item.name}-image`}
                            />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.content,
                              }}
                            ></div>
                            <div className="d-flex justify-content-between ">
                              <div className="d-flex">
                                <TerrainIcon />
                                <p>Max Altitude: {item.maxAltitude}</p>
                              </div>
                              <div className="d-flex">
                                <GiMeal />
                                <p>Meals: {item.meals}</p>
                              </div>
                              <div className="d-flex">
                                <FaBed />
                                <p>Accomodation: {item.accomodation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(packageDetail?.inclusions.length !== 0 ||
                  packageDetail?.exclusions.length !== 0) && (
                  <div
                    className="cost-IE-container mt-5"
                    id="costInclueExclude"
                  >
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
                        }}
                      >
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
                        }}
                      >
                        <span className="me-1">
                          <CancelIcon fontSize="small" />
                        </span>
                        Cost Exclude
                      </div>
                    </div>
                    <div className="const-IE-content mt-1 mt-md-3">
                      <ul>
                        {showCostInclude
                          ? packageDetail?.inclusions.map((item, index) => (
                              <li key={`${item}-${index}`}>
                                <CheckCircleOutlineIcon
                                  className="text-success"
                                  fontSize="small"
                                />
                                {item}
                              </li>
                            ))
                          : packageDetail?.exclusions.map((item, index) => (
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
                )}
                {packageDetail?.highlights.length !== 0 && (
                  <div className="trip-highlights">
                    <h4 className="title pt-50">Trip Highlights</h4>
                    {packageDetail?.highlights.map((item) => (
                      <p>{item}</p>
                    ))}
                  </div>
                )}
                {packageDetail?.tripMapUrl !== "" && (
                  <div className="map-container mt-5" id="map">
                    <h4 className="title">
                      <MapIcon />
                      Trip Map
                    </h4>
                    <div className="map-image">
                      <Image
                        src={packageDetail?.tripMapUrl}
                        width={611}
                        height={897}
                        alt="map"
                      />
                    </div>
                  </div>
                )}
                {packageDetail?.departureDate.length !== 0 && (
                  <div
                    className="fix-departure-date-table mt-5"
                    id="date-price"
                  >
                    <h4 className="title">
                      <CalendarMonth />
                      Dates & Price
                    </h4>
                    {/* <table> */}
                    <table className="table table-hover">
                      {/* <div className="d-flex gap-3"> */}
                      <thead>
                        <tr>
                          <th className="text-success">Start Date</th>
                          <th className="text-success">End Date</th>
                          <th className="text-success">Status</th>
                          <th className="text-success">Price per Person</th>
                          <th></th>
                        </tr>
                      </thead>
                      {/* </div> */}

                      {packageDetail?.departureDate.map((item) => (
                        // <div className="d-flex gap-3">
                        <tbody>
                          <tr>
                            <td className="text-muted">
                              {dayjs(item.startDate).format("MMM DD, YYYY")}
                            </td>
                            <td className="text-muted">
                              {dayjs(item.endDate).format("MMM DD, YYYY")}
                            </td>
                            <td className="text-muted">
                              {item.isAvailable ? "Available" : "Unavailable"}
                            </td>
                            <td className="text-muted">
                              {item.pricePerPerson}
                            </td>
                            <td>
                              <button
                                disabled={!item.isAvailable}
                                className={`${
                                  item.isAvailable
                                    ? "btn btn-sm bg-success"
                                    : "btn btn-sm bg-danger text-decoration-line-through"
                                } text-light`}
                                onClick={() => {
                                  setPageLevelLoader(true);
                                  router.push(
                                    `/package/${packageDetail._id}/booking`
                                  );
                                }}
                              >
                                Book Now
                              </button>
                            </td>
                            {/* </div> */}
                          </tr>
                        </tbody>
                      ))}
                    </table>
                    {/* </table> */}
                  </div>
                )}
                <div
                  className="extra-contents"
                  dangerouslySetInnerHTML={{
                    __html: packageDetail?.content,
                  }}
                ></div>
                {packageDetail?.gallery.length !== 0 &&
                  packageDetail?.gallery[0].images.length !== 0 && (
                    <div>
                      <h4 className="title mt-5">
                        <CollectionsIcon />
                        Video & Photo Gallery
                      </h4>
                      <div>
                        {packageDetail?.gallery[0].images.map((item) =>
                          isImage(item) ? (
                            <Image src={item} height={200} width={200} />
                          ) : (
                            <div>
                              <CldVideoPlayer
                                width="640"
                                height="360"
                                src="leaf-holiday/xarbztl3saguijhnmtvy"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {packageDetail?.faq.length !== 0 && (
                  <div className="mt-5">
                    <h4 className="title">
                      <ContactSupportIcon />
                      FAQs
                    </h4>
                    <ol>
                      {packageDetail?.faq.map((item) => (
                        <li>
                          <p>{item.question}</p>
                          <p className="text-muted">{item.answer}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3 booking-card pt-4">
                <BookingCard
                  prices={packageDetail?.prices}
                  packageId={packageDetail?._id}
                />
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
