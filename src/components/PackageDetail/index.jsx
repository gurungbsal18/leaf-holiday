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
import { getEmbeddedYouTubeUrl, isImage } from "@/utils/functions";
import "next-cloudinary/dist/cld-video-player.css";
import Fancybox from "@/components/FancyappWrapper";
import { FaTripadvisor } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import axios from "@/utils/axios";
import PackageCard from "../PackageCard";
import CreateTestimonial from "../CreateComponents/CreateTestimonial";

export default function PackageDetail({ packageDetail }) {
  const {
    setDialogOpen,
    setDialogContent,
    isAuthUser,
    user,
    setBookingFormData,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showItineraryDetails, setShowItineraryDetails] = useState({});
  const [expandOrCollapse, setExpandOrCollapse] = useState(false);
  const [showCostInclude, setShowConstInclude] = useState(true);
  const [activeCost, setActiveCost] = useState(true);
  const [contentExpand, setContentExpand] = useState(false);
  const [showAnswer, setShowAnswer] = useState({});
  const [isSticky, setIsSticky] = useState(false);
  const [initialOffset, setInitialOffset] = useState(0);
  const [relatedPackages, setRelatedPackages] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos >= initialOffset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const stickyNavBar = document.querySelector(".single-trip-nav");
    if (stickyNavBar) {
      setInitialOffset(stickyNavBar.offsetTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialOffset]);

  const stickyNavBarStyle = {
    position: isSticky ? "fixed" : "relative",
    top: isSticky ? 0 : "auto",
    maxWidth: isSticky ? "100%" : "revert-layer",
    paddingLeft: isSticky ? "11%" : "0",
  };

  const packageId = usePathname().match(/\/package\/([^\/]+)(?:\/|$)/)[1];
  "slug: ", packageId;

  const router = useRouter();

  const iconMapping = {
    duration: { icon: <CalendarMonthIcon />, label: "Duration" },
    difficulty: { icon: <HikingIcon />, label: "Difficulty" },
    maxAltitude: { icon: <TerrainIcon />, label: "Max Altitude" },
    bestWeather: { icon: <ThunderstormIcon />, label: "Best Weather" },
    meals: { icon: <GiMeal />, label: "Meals" },
    accomodation: { icon: <FaBed />, label: "Accomodation" },
    transportation: { icon: <FaCar />, label: "Transportation" },
    group: { icon: <MdGroups />, label: "Group" },
  };

  useEffect(() => {
    if (packageDetail && packageDetail?.itineraries) {
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
  useEffect(() => {
    if (packageDetail && packageDetail?.faq) {
      if (Object.keys(showAnswer).length === packageDetail?.faq.length) {
        setExpandOrCollapse(Object.values(showAnswer).every((value) => value));
      }
    }
  }, [showAnswer, packageDetail]);
  const handleFaqToggle = (id) => {
    setShowAnswer((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
  showItineraryDetails;
  const readMoreBtn = () => {
    setContentExpand(!contentExpand);
  };

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
        router.push(`/package/${packageDetail?.slug}/booking`);
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
        router.push(`/package/${packageDetail?.slug}/inquiry`);
      }, 1000);
    }
  };

  const getRelatedPackages = async () => {
    try {
      const res = await axios.get(
        `/region/slug/${packageDetail?.region?.slug}`
      );
      if (res.status === 200) {
        let allPackages = res.data?.data[0]?.packages;
        allPackages = allPackages.map((obj) => {
          return { ...obj, region: packageDetail.region };
        });
        const arr = allPackages.filter((obj) => obj._id !== packageDetail._id);
        setRelatedPackages(arr.slice(0, 6));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRelatedPackages();
  }, []);

  return (
    <div className="main-div mb-5">
      <div className="single-trip-hero">
        <Image
          src={packageDetail?.mainImageUrl}
          width={1519}
          height={800}
          alt="header image"
          priority
        />

        <div className="container d-flex justify-content-center">
          <div className="container d-flex justify-content-between flex-column flex-md-row single-trip-hero-title">
            <h1 className="single-trip-title mb-0">{packageDetail?.name}</h1>
            <div className="d-flex gap-2">
              <Button variant="success" size="sm" onClick={handleBook}>
                Book Now
              </Button>
              <Button variant="outline-light" size="sm" onClick={handleInquiry}>
                Send Inquiry
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-success-subtle">
        <div
          className={`container d-flex gap-5
            ${
              isSticky
                ? "single-trip-nav sticky-trip-nav bg-success-subtle"
                : "single-trip-nav"
            }
          `}
          style={stickyNavBarStyle}
        >
          {packageNavItems.map((item) => (
            <a key={item.id} href={item.path}>
              <span className="text-muted fs-12">{item.icon}</span> {item.label}
            </a>
          ))}
        </div>
      </div>
      <Container className="single-trip p-auto p-md-0">
        <div className="row content-div p-auto p-md-0">
          <div className="col-12 col-lg-9 pt-3">
            {packageDetail?.tripFacts.length !== 0 && (
              <div className="row d-flex trip-fact my-4">
                {packageDetail?.tripFacts &&
                  Object?.entries(packageDetail?.tripFacts).map(
                    ([key, value]) => {
                      if (value.info !== "" && value.info !== 0) {
                        return (
                          <div key={key} className="col-6 col-md-3 d-flex my-2">
                            <div className="trip-fact-icon text-muted">
                              {iconMapping[key].icon}
                            </div>
                            <div>
                              <p className="trip-fact-title m-0 text-muted">
                                {iconMapping[key].label}
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
                {packageDetail?.difficulty && (
                  <div className="col d-flex my-2">
                    <div className="trip-fact-icon text-muted">
                      {iconMapping["difficulty"].icon}
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
                )}
              </div>
            )}
            {packageDetail?.overview !== "" && (
              <div id="overview" className="pt-6">
                <h2 className="title">{packageDetail?.name}</h2>
                <div
                  className={`text-justify ${
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
            {packageDetail?.itineraries &&
              packageDetail?.itineraries.length !== 0 && (
                <div className="pt-6" id="itinerary">
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
                        <div
                          className="d-flex justify-content-between align-items-center bg-light p-2"
                          onClick={() => handleToggle(item._id)}
                          style={{ cursor: "pointer" }}
                        >
                          {showItineraryDetails[item._id]}
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
                          >
                            {showItineraryDetails[item._id] ? "-" : "+"}
                          </Button>
                        </div>
                        <div
                          className={`text-justify ${
                            showItineraryDetails[item._id]
                              ? "detail-itinerary"
                              : "d-none "
                          }`}
                        >
                          {item.image && (
                            <div className="itinerary-img">
                              <Image
                                src={item.imageUrl}
                                height={500}
                                width={500}
                                alt={`${item.name}-image`}
                              />
                            </div>
                          )}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
                          ></div>
                          <div className="d-flex justify-content-between itinerary-fact">
                            {item.maxAltitude && (
                              <div className="d-flex align-items-center gap-1">
                                <TerrainIcon className="text-muted" />
                                <p className="m-0 fs-14">
                                  Max Altitude: {item.maxAltitude}
                                </p>
                              </div>
                            )}
                            {item.meals && (
                              <div className="d-flex align-items-center gap-1">
                                <GiMeal className="text-muted" />
                                <p className="m-0 fs-14">Meals: {item.meals}</p>
                              </div>
                            )}
                            {item.accomodation && (
                              <div className="d-flex align-items-center gap-1">
                                <FaBed className="text-muted" />
                                <p className="m-0 fs-14">
                                  Accomodation: {item.accomodation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {(packageDetail?.inclusions.length !== 0 ||
              packageDetail?.exclusions.length !== 0) && (
              <div className="cost-IE-container pt-6" id="costInclueExclude">
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
            {packageDetail?.highlights &&
              packageDetail?.highlights.length !== 0 && (
                <div className="trip-highlights">
                  <h4 className="title pt-50">Trip Highlights</h4>
                  {packageDetail?.highlights.map((item, index) => (
                    <p key={`trip-highlight-${index}`}>{item}</p>
                  ))}
                </div>
              )}
            {packageDetail?.tripMapUrl && packageDetail?.tripMapUrl !== "" && (
              <div className="map-container pt-6" id="map">
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
            {packageDetail?.departureDate &&
              packageDetail?.departureDate.length !== 0 && (
                <div className="fix-departure-date-table pt-6" id="date-price">
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

                    {packageDetail?.departureDate.map((item, index) => (
                      <tbody key={`departure-date-${index}`}>
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
                          <td className="text-muted">{item.pricePerPerson}</td>
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
                                  `/package/${packageDetail.slug}/booking`
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
              className="extra-contents text-justify"
              dangerouslySetInnerHTML={{
                __html: packageDetail?.content,
              }}
            ></div>
            {packageDetail?.gallery &&
              packageDetail?.gallery.length !== 0 &&
              packageDetail?.gallery[0].images.length !== 0 && (
                <div>
                  <h4 className="title pt-6">
                    <CollectionsIcon />
                    Photo Gallery
                  </h4>
                  <div className="">
                    <Fancybox
                      options={{
                        Carousel: {
                          infinite: false,
                        },
                      }}
                    >
                      {packageDetail?.gallery[0].images.map((item) => (
                        <a data-fancybox="gallery" href={item} key={item}>
                          <div className="itinerary-img-container">
                            <Image
                              src={item}
                              height={200}
                              width={200}
                              alt="gallery-image"
                            />
                            <span className="img-overlay"></span>
                          </div>
                        </a>
                      ))}
                    </Fancybox>
                  </div>
                </div>
              )}
            {packageDetail?.videoGallery &&
              packageDetail?.videoGallery.length !== 0 && (
                <div>
                  <h4 className="title mt-5">
                    <CollectionsIcon />
                    Video Gallery
                  </h4>
                  <div>
                    <Fancybox
                      options={{
                        Carousel: {
                          infinite: false,
                        },
                      }}
                    >
                      {packageDetail?.videoGallery?.map((item) => (
                        <a key={item} data-fancybox="gallery" href={item}>
                          <iframe
                            className="w-100"
                            width="150"
                            height="90"
                            src={getEmbeddedYouTubeUrl(item)}
                            title="YouTube video player"
                            allowFullScreen
                          ></iframe>
                        </a>
                      ))}
                    </Fancybox>
                  </div>
                </div>
              )}
            {packageDetail?.faq && packageDetail?.faq.length !== 0 && (
              <div className="pt-6">
                <h4 className="title">
                  <ContactSupportIcon />
                  FAQs
                </h4>
                <ol>
                  {packageDetail?.faq.map((item, index) => (
                    <li key={`faq-${index}`}>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>{item.question}</p>
                        <Button
                          variant="success"
                          size="sm"
                          className="itinerary-expand-btn"
                          onClick={() => handleFaqToggle(item._id)}
                        >
                          {showAnswer[item._id] ? "-" : "+"}
                        </Button>
                      </div>
                      <p
                        className={`text-muted ${
                          showAnswer[item._id] ? "" : "d-none"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {packageDetail?.reviews && packageDetail?.reviews.length !== 0 && (
              <div className="pt-6">
                <div className="d-flex justify-content-between ">
                  <h4 className="title">
                    <ContactSupportIcon />
                    Reviews
                  </h4>
                  <button
                    className="text-success"
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogContent(<CreateTestimonial />);
                    }}
                  >
                    Add a Review
                  </button>
                </div>
                <ol>
                  {packageDetail?.reviews.map(
                    (item, index) =>
                      item.isVerified && (
                        <li key={`review-${index}`} className="d-flex">
                          <div>icon</div>
                          <div>
                            <p>
                              {item.userName} -{" "}
                              {dayjs(item.date).format("DD MMM, YYYY")}
                            </p>
                            <Rating readOnly value={item.stars} />
                            <p>{item.comment}</p>
                          </div>
                        </li>
                      )
                  )}
                </ol>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-3 booking-card pt-4">
            <BookingCard
              prices={packageDetail?.prices}
              packageId={packageDetail?.slug}
              pdfUrl={packageDetail?.pdfUrl}
            />
          </div>
        </div>
        <div className="pt-6">
          <h4 className="title">Related Packages</h4>
          <div className="row">
            {relatedPackages &&
              relatedPackages.map((item) => (
                <PackageCard key={item._id} packageDetail={item} />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
