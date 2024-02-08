// components/ReviewCarousel.js
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Rating from "@mui/material/Rating";

const ReviewCarousel = ({ reviews }) => {
  const [reviewIndex, setReviewIndex] = useState(0);

  const handlePrev = () => {
    if (reviewIndex <= 0) {
      setReviewIndex(reviews?.length - 1);
    } else {
      setReviewIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (reviewIndex >= reviews?.length - 1) {
      setReviewIndex(0);
    } else {
      setReviewIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="review-slider position-relative">
      <div key={reviews[reviewIndex]._id} className="review-slider-content">
        <span className="user-icon">
          <AccountCircleIcon className="mt-5 mb-3" />
        </span>
        <h4 className="text-muted fw-bold">
          {reviews[reviewIndex]?.packageId?.name}
        </h4>
        <p>{reviews[reviewIndex]?.userName}</p>
        <Rating value={Number(reviews[reviewIndex]?.stars)} readOnly />
        <p className="text-muted">{reviews[reviewIndex]?.comment}</p>
      </div>
      <div className="review-slider-btn">
        <button onClick={handlePrev} className="btn btn-sm btn-outline-success">
          {"<"}
        </button>
        <button onClick={handleNext} className="btn btn-sm btn-outline-success">
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
