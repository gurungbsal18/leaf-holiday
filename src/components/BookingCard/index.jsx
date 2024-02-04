"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { priceCalculator } from "@/utils/functions";

const BookingCard = ({ prices, packageId }) => {
  const { isAuthUser, setPageLevelLoader } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();
  const [showGroupPrice, setShowGroupPrice] = useState(false);
  const currentDate = new Date().toDateString();
  const [formData, setFormData] = useState({
    packageId: packageId,
    userId: user?._id || "",
    phoneNumber: user?.phoneNumber || "",
    country: "",
    dateOfTravel: dayjs(currentDate),
    numberOfPeople: 1,
    price: prices[0]?.price,
    message: "",
    formType: "booking",
  });

  const handleBook = () => {
    setPageLevelLoader(true);
    if (!isAuthUser) {
      toast.error("Please Login To Book The Package", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      console.log("Booking card form submitted: ", formData);
      localStorage.setItem("bookingData", JSON.stringify(formData));
      setTimeout(() => {
        router.push(`/package/${packageId}/booking`);
      }, 1000);
    }
  };
  const handleInquiry = () => {
    setPageLevelLoader(true);
    if (!isAuthUser) {
      toast.error("Please Login To Send An Inquiry", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setTimeout(() => {
        router.push(`/package/${packageId}/inquiry`);
      }, 1000);
    }
  };
  const handleCustomize = () => {
    setPageLevelLoader(true);
    if (!isAuthUser) {
      toast.error("Please Login To Customize The Package", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setTimeout(() => {
        router.push(`/package/${packageId}/customizeTrip`);
      }, 1000);
    }
  };

  return (
    <div className="sticky-top">
      <div className="d-flex booking-card-price-header">
        {/* <LocalOfferIcon /> */}
        <TurnedInNotIcon />
        <div>
          <p className="price-title m-0">
            Price Per Person
            {/* <br />
            <span>
              US $
              {priceCalculator(prices, formData.noOfGuests)}
            </span> */}
          </p>
          <p className="price-amount m-0">
            US ${priceCalculator(prices, formData.numberOfPeople)}
          </p>
        </div>
      </div>
      <div className="booking-card-body mb-2">
        <div
          className="d-flex align-items-center mb-1"
          style={{ position: "relative" }}>
          <Button
            variant="light"
            size="sm"
            onClick={() => setShowGroupPrice(!showGroupPrice)}
            className="d-flex justify-content-between gap-5 w-100">
            <p className="m-0">We Offer Group Prices</p>
            <ArrowDropDownIcon />
          </Button>
        </div>
        <div
          className={`${showGroupPrice ? "" : "d-none"} group-price-dropdown`}>
          <ul className="p-0 m-0">
            <li className="d-flex justify-content-between align-items-center">
              <p className="fs-14">No. of People</p>
              <p className="fs-14">Price per Person</p>
            </li>
            {prices.map((item) => (
              <li
                key={item.id}
                className="d-flex justify-content-between align-items-center fs-14">
                <p>{item.numberOfPeople}</p>
                <p>US$ {item.price}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-light booking-card-inner-body">
          <div className="d-flex">
            <CalendarMonthIcon />
            <h6>Select Date</h6>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                className="w-100"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dateOfTravel: dayjs(e),
                  })
                }
                defaultValue={dayjs(formData.dateOfTravel)}
              />
            </LocalizationProvider>
          </div>
          <div className="p-2 bg-success my-2 rounded d-flex justify-content-center align-items-center gap-2">
            <CalendarMonthIcon style={{ color: "white" }} />
            <a
              href="#date-price"
              role="button"
              className="fs-14 text-light text-decoration-none">
              Fixed Departure Dates
            </a>
          </div>
          <div>
            <p className="mb-1 mt-3">No. of Guests</p>
            <input
              className="form-control mb-2"
              defaultValue={1}
              min={1}
              max={30}
              placeholder={0}
              type={"Number"}
              value={formData.numberOfPeople}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  numberOfPeople: Number(e.target.value),
                  price:
                    priceCalculator(prices, Number(e.target.value)) *
                    Number(e.target.value),
                });
              }}
            />
            <span className="d-flex justify-content-between ">
              <p>{`$${priceCalculator(prices, formData.numberOfPeople)} x ${
                formData.numberOfPeople
              }`}</p>
              <p>{formData.price}</p>
            </span>
            <span className="d-flex justify-content-between ">
              <p>Total</p>
              <p>{formData.price}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 flex-column">
        <div className="d-flex gap-2">
          <Button variant="success" className="w-100" onClick={handleBook}>
            Book Now
          </Button>
          <Button variant="success" className="w-100" onClick={handleInquiry}>
            Send Inquiry
          </Button>
        </div>
        <Button
          className="btn btn-theme-secondary w-100"
          onClick={handleCustomize}>
          Customize Trip
        </Button>
        <Button
          className="d-flex justify-content-center align-items-center gap-2"
          variant="success">
          <PictureAsPdfIcon fontSize="large" />
          <p className="m-0">Download PDF</p>
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
