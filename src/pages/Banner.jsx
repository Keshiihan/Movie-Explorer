import React from "react";
import bannerImage from "../assets/images/bannerimage.jpg";
import SearchInput from "../components/SearchInput";

const Banner = ({ onSearch }) => {
  return (
    <div
      className="h-[400px] bg-cover bg-center relative py-5"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${bannerImage})`,
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
      </div>
    </div>
  );
};

export default Banner;