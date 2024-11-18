import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center h-[90vh] px-4">
      <img
        className="w-full h-full object-cover"
        src="/images/hero-banner.jpg"
        alt="Hero Image"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <h1 className="text-white text-4xl font-bold tracking-widest">
          BUY THE FUTURE
        </h1>
        <h2 className="text-white text-xl font-light mt-2">
          Discover the latest in technology
        </h2>
        <Link href="/shop">
          <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded hover:backdrop-blur-md transition-transform duration-200 transform hover:scale-105">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
