import React from "react";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
  return (
    <div className="container">
      <div className="py-100">
        <div className="d-flex justify-content-center gap-5 flex-column flex-lg-row align-items-center">
          <span className="d-flex flex-column">
            <h4 className="title text-danger">Booking Failed</h4>
            <button className="btn btn-success">
              <ArrowBackIcon className="me-1" />
              Back to homepage
            </button>
          </span>
          <div className="booking-cancel-image">
            <Image
              src="/images/booking-fail.png"
              alt="booking-fail"
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
