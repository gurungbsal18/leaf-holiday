import React from "react";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
  return (
    <div className="container py-100">
      <div className="d-flex justify-content-center gap-5 flex-column flex-lg-row align-items-center">
        <span className="d-flex flex-column">
          <h4 className="title text-danger">Your booking has been canceled</h4>
          <button className="btn btn-success">
            <ArrowBackIcon className="me-1" />
            Back to homepage
          </button>
        </span>
        <div className="booking-cancel-image">
          <Image
            src="/images/booking-cancel.jpg"
            alt="booking-cancel"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
