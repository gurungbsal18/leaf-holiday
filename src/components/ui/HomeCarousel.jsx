import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function HomeCarousel({ carouselData }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handlePrev = () => {
    if (carouselIndex <= 0) {
      setCarouselIndex(carouselData?.length - 1);
    } else {
      setCarouselIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (carouselIndex >= carouselData?.length - 1) {
      setCarouselIndex(0);
    } else {
      setCarouselIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselData?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-carousel-container">
      <div className="carousel-content position-relative ">
        <Image
          src={carouselData[carouselIndex].imageUrl}
          width={1519}
          height={520}
          alt="hero-image"
        />
        <h1 className="position-absolute bottom-0 mx-auto">
          {carouselData[carouselIndex].imageName}
        </h1>
      </div>
      <button onClick={handlePrev}>{"<"}</button>
      <button onClick={handleNext}>{">"}</button>
    </div>
  );
}
