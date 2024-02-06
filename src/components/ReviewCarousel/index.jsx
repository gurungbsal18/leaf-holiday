// components/ReviewCarousel.js
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div key={reviews[reviewIndex]._id}>
        <FaUserAlt />
        <p>{reviews[reviewIndex]?.packageId?.name}</p>
        <p>{reviews[reviewIndex]?.userName}</p>
        <Rating value={Number(reviews[reviewIndex]?.stars)} readOnly />
        <p>{reviews[reviewIndex]?.comment}</p>
      </div>
      <div>
        <button onClick={handlePrev}>{"<<"}</button>
        <button onClick={handleNext}>{">>"}</button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
