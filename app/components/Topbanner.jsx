"use client";
import React, { useState, useEffect } from "react";

const Topbanner = () => {
  const bannerList = [
    { id: 1, img: "/banner1.jpg" },
    { id: 2, img: "/banner2.jpg" },
    { id: 3, img: "/banner3.jpg" },
  ];
  const [current, setCurrent] = useState(0);
    // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1.3) % bannerList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerList.length]);

  return (
    <div className="relative w-full overflow-hidden h-[15rem] rounded-lg mt-[7rem] ">
      {/* Slider container */}
      <div className=" flex flex-row gap-3 rounded-lg overflow-x-scroll px-[3%] h-full " 
     
      >
        {bannerList?.map((item, index) => {
          return <img 
               style={{
          transform: `translateX(+${current * 100}%)`,
          width: `${bannerList.length * 100}%`,
        }}
        //    style={{transform: `translateX(+${current * (320 / bannerList.length)}%)`}}
           key={index} src={item.img} className=" rounded-lg w-[20rem] h-auto object-cover  " ></img>;
        })}
      </div>
      {/* Dots indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2"
    
      >
        {bannerList.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              current === index ? "bg-pink-500 w-4" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Topbanner;
