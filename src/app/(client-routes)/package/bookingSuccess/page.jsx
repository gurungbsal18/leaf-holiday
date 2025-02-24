import React from "react";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
  return (
    <div className="container">
      <div className="py-100">
        <div className="d-flex justify-content-center gap-5 flex-column flex-lg-row align-items-center">
          <span className="d-flex flex-column">
            <h4 className="title text-success">Booking Successfull</h4>
            <p className="m-0 text-muted">Thank you for booking with us</p>
            <p className="m-0 text-muted">
              Soon we will contact you for further information and details
            </p>
            <button className="btn btn-success mt-2">
              <ArrowBackIcon className="me-1" />
              Back to homepage
            </button>
          </span>
          <div className="booking-cancel-image">
            <Image
              src="/images/booking-success.png"
              alt="booking-success"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
