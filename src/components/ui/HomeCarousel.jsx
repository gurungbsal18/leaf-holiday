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
    }, 3000);

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
        <h1 className="position-absolute bottom-5 mx-auto w-100">
          {carouselData[carouselIndex].imageName}
        </h1>
      </div>
      <button onClick={handlePrev} className="d-none">
        {"<"}
      </button>
      <button onClick={handleNext} className="d-none">
        {">"}
      </button>
    </div>
  );
}
