"use client";
import React, { useState } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showImages = () => {
    const visibleImages = images.slice(currentIndex, currentIndex + 3);

    return visibleImages.map((imageUrl, index) => (
      <Image
        height={200}
        width={150}
        key={index}
        src={imageUrl}
        alt={`Image ${index + 1}`}
      />
    ));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            gap: "1rem",
          }}>
          {showImages()}
        </div>
      </div>

      {images.length > 3 && (
        <div>
          <button disabled={currentIndex <= 0} onClick={prevSlide}>
            Previous
          </button>
          <button
            disabled={currentIndex >= images.length - 3}
            onClick={nextSlide}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
