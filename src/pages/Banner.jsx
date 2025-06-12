import React, { useEffect, useState, useRef } from "react";
import bannerImage1 from "../assets/images/bannerimage.jpg";
import bannerImage2 from "../assets/images/deadpool.jpg";
import bannerImage3 from "../assets/images/master.jpg";
import bannerImage4 from "../assets/images/simbu.jpg";
import bannerImage5 from "../assets/images/bahu.jpg";
import bannerImage6 from "../assets/images/batman.jpg";
import SearchInput from "../components/SearchInput";

const carouselImages = [
  bannerImage1,
  bannerImage2,
  bannerImage3,
  bannerImage4,
  bannerImage5,
  bannerImage6,
];

const Banner = ({ onSearch }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 2500);

    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div
      className="h-[400px] bg-cover bg-center relative py-5 transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${carouselImages[current]})`,
      }}
    >
      <div className="flex flex-col gap-10 px-15 py-20">
        <div className="text-white">
          <h2 className="font-extrabold text-5xl">Welcome.</h2>
          <h3 className="font-semibold text-[2rem]">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
        <div>
          <SearchInput onSearch={onSearch} />
        </div>
        {/* Carousel indicators */}
      </div>
    </div>
  );
};

export default Banner;
