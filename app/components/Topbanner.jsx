"use client";
import React, { useState, useEffect } from "react";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";

const Topbanner = () => {
  const bannerList = [
    { id: 1, img: "/banner1.jpg" },
    { id: 2, img: "/banner2.jpg" },
    { id: 3, img: "/banner3.jpg" },
  ];
  const [current, setCurrent] = useState(0);
 
  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [bannerList.length]);

  const goPrev = () => {
    setCurrent((prev) =>
      prev === 0 ? bannerList.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % bannerList.length);
  };
  return (
   <div className="relative w-full overflow-hidden h-[15rem] bg-green-200 rounded-lg mt-[7rem]">
      {/* Slider wrapper */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(+${current * 100}%)` }}
      >
        {bannerList.map((item, index) => (
          <img
            key={index}
            src={item.img}
            alt="banner"
            className="w-full flex-shrink-0"
          />
        ))}
      </div>

      {/* Buttons */}
     
        <FaCircleChevronLeft size={24} color="#FFFCFB"  onClick={goNext}
        className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle"/>
  
        <FaCircleChevronRight onClick={goPrev} size={24} color="#FFFCFB"
        className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle" />
   
    </div>
  );
};

export default Topbanner;
