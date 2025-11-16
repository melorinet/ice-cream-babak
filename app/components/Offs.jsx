"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

const Offs = () => {
  const [time, setTime] = useState({
    days: 15,
    hours: 10,
    minutes: 24,
    seconds: 59,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const OffList = [
    {
      id: 1,
      src: "/ice-cream.png",
      name: "بستنی عروسکی ",
      price: "120000",
    },
    {
      id: 2,
      src: "/ice-cream.png",
      name: "بستنی شکلاتی",
      price: "120000",
    },
    {
      id: 3,
      src: "/ice-cream.png",
      name: "بستنی میوه ای",
      price: "150000",
    },
    {
      id: 4,
      src: "/ice-cream.png",
      name: "بستنی وانیلی",
      price: "180000",
    },
    {
      id: 5,
      src: "/ice-cream.png",
      name: "بستنی شکلات کارامل",
      price: "130000",
    },
    {
      id: 6,
      src: "/ice-cream.png",
      name: "بستنی دبی چاکلت",
      price: "160000",
    },
  ];
  return (
    <div className=" flex flex-col w-full h-auto min-h-[78vh] gap-[0.5rem]  px-[3%] mt-[0.7rem] ">
      <div className=" w-full  h-fit flex flex-row justify-between gap-2 place-items-center ">
        <h3 className=" text-[#132440] text-[18px]  ">
          تخفیف های ویژه
        </h3>

        <Link href={`/landing/moreProducts/${"تخفیف های ویژه"}`}><h3 className=" text-[#093FB4] text-[16px] ">مشاهده بیشتر</h3></Link>
      </div>

      {/* COUNTER START  */}
      <div className="grid grid-flow-col gap-1 w-full place-content-center place-items-center self-center text-center ">
        {[
          { label: "روز", value: time.days },
          { label: "ساعت", value: time.hours },
          { label: "دقیقه", value: time.minutes },
          { label: "ثانیه", value: time.seconds },
        ].map((unit) => (
          <div
            key={unit.label}
            className="flex w-[3.5rem] h-[3.5rem] rounded-md flex-col bg-[#218EFF] place-content-center place-items-center "
          >
            <span className="countdown font-mono  text-[16px]">
              <span
                style={{ "--value": unit.value }}
                aria-live="polite"
                aria-label={`${unit.value} ${unit.label}`}
              >
                {unit.value}
              </span>
            </span>
            {unit.label}
          </div>
        ))}
      </div>
      {/* COUNTER END  */}
      <div className=" w-full grid grid-cols-2 mt-4 h-auto min-h-[60vh] overflow-visible gap-[1rem] place-items-center  ">
        {OffList?.map((item, index) => {
          const tomanPrice = new Intl.NumberFormat("fa-IR").format(item.price);
          return (
            <ProductCard id={item.id} key={index} src={item.src} tomanPrice={tomanPrice} name={item.name} />

            // <section
            //   key={index}
            //   className=" carousel-item bg-[url(/meltedCard.png)] bg-cover bg-center !w-full !h-[10rem] rounded-md flex flex-col gap-[0.8rem] border-[0.5px] place-items-center border-[#CD2C58] shadow-md shadow-zinc-500 "
            // >
            //   {/* <img src={item.src} alt="ice-cream" className=" w-[6.5rem] h-[6rem] rounded-full overflow-hidden border self-center -mt-7 shadow-sm shadow-zinc-400 " /> */}
            //   <img
            //     src={item.src}
            //     alt="ice-cream"
            //     className="w-[6.5rem] h-[6rem] object-contain rounded-full border self-center mt-[-1rem] sm:mt-[-1.5rem] ..."
            //   />

            //   <h3 className=" text-[#132440] text-[16px] font-normal ">
            //     {item.name}{" "}
            //   </h3>
            //   <h3 className=" text-[#132440] text-[14px] ">
            //     {tomanPrice}تومان{" "}
            //   </h3>
            // </section>
          );
        })}
      </div>
    </div>
  );
};

export default Offs;
