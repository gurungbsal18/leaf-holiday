import React, { useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Button from "react-bootstrap/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputComponent from "../FormElements/InputComponent";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const BookingCard = ({ price }) => {
  const [showGroupPrice, setShowGroupPrice] = useState(false);
  const currentDate = new Date().toDateString();
  const [formData, setFormData] = useState({
    tripDate: dayjs(currentDate).format("ddd MMM DD, YYYY"),
    noOfGuests: 1,
    total: price,
  });

  const bookingDetail = {
    groupPrice: [
      {
        id: 1,
        maxNoOfPeople: 1,
        peopleRange: "1 - 1",
        price: 799,
      },
      {
        id: 2,
        maxNoOfPeople: 2,
        peopleRange: "2 - 2",
        price: 699,
      },
      {
        id: 3,
        maxNoOfPeople: 7,
        peopleRange: "3 - 7",
        price: 599,
      },
      {
        id: 4,
        maxNoOfPeople: 15,
        peopleRange: "8 - 15",
        price: 499,
      },
      {
        id: 5,
        maxNoOfPeople: 30,
        peopleRange: "16 - 30",
        price: 375,
      },
    ],
  };

  const priceCalculator = (priceRange, guestNumber) => {
    for (let i = 0; i < priceRange.length; i++) {
      if (guestNumber <= priceRange[i].maxNoOfPeople) {
        return priceRange[i].price;
      }
    }
  };
  return (
    <div className="sticky-top">
      <div className="d-flex">
        <LocalOfferIcon />
        <div>
          <p>Price Per Person</p>
          <p>
            US ${priceCalculator(bookingDetail.groupPrice, formData.noOfGuests)}
          </p>
        </div>
      </div>
      <div className="">
        <div className="d-flex justify-content-center align-items-center">
          <Button
            onClick={() => setShowGroupPrice(!showGroupPrice)}
            className="d-flex gap-5 ">
            <p>We Offer Group Prices</p>
            <ArrowDropDownIcon />
          </Button>
        </div>
        <div className={`${showGroupPrice ? "" : "d-none"}`}>
          <ul>
            <li className="d-flex justify-content-between ">
              <h6>No. of People</h6>
              <h6>Price per Person</h6>
            </li>
            {bookingDetail.groupPrice.map((item) => (
              <li key={item.id} className="d-flex justify-content-between ">
                <p>{item.peopleRange}</p>
                <p>US$ {item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="d-flex">
          <CalendarMonthIcon />
          <h6>Select Date</h6>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tripDate: dayjs(e).format("ddd MMM DD, YYYY"),
                })
              }
              defaultValue={dayjs(formData.tripDate)}
            />
          </LocalizationProvider>
        </div>
        <div>
          <a href="#date-price">Or View Our Fixed Departure Dates</a>
        </div>
        <div>
          <p>No. of Guests</p>
          <input
            min={1}
            max={30}
            placeholder={0}
            type={"Number"}
            value={formData.noOfGuests}
            onChange={(e) => {
              setFormData({
                ...formData,
                noOfGuests: e.target.value,
                total:
                  priceCalculator(bookingDetail.groupPrice, e.target.value) *
                  e.target.value,
              });
            }}
          />
          <span className="d-flex justify-content-between ">
            <p>{`$${priceCalculator(
              bookingDetail.groupPrice,
              formData.noOfGuests
            )} x ${formData.noOfGuests}`}</p>
            <p>{formData.total}</p>
          </span>
          <span className="d-flex justify-content-between ">
            <p>Total</p>
            <p>{formData.total}</p>
          </span>
        </div>
      </div>
      <div>
        <div>
          <Button>Book Now</Button>
          <Button>Send Inquiry</Button>
        </div>
        <Button>Customize Trip</Button>
        <Button className="d-flex">
          <PictureAsPdfIcon />
          <p>Download PDF</p>
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
