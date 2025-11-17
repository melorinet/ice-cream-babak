import React from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import ProductCard from "../../components/ProductCard";
import { TbIceCream } from "react-icons/tb";
import { IoIceCreamOutline } from "react-icons/io5";
import { LuIceCreamBowl } from "react-icons/lu";
import { GiChocolateBar } from "react-icons/gi";
import { PiIceCreamDuotone } from "react-icons/pi";
import { GiFruitBowl } from "react-icons/gi";
const page = () => {
  const List = [
    {
      id: 1,
      icon: <TbIceCream size={32} color="#132440" />,
      name: "چوبی",
    },
    {
      id: 2,
      icon: <LuIceCreamBowl size={32} color="#132440" />,
      name: "لیوانی",
    },
    {
      id: 3,
      icon: <GiChocolateBar size={32} color="#132440" />,
      name: "شکلاتی",
    },
    {
      id: 4,
      icon: <IoIceCreamOutline size={32} color="#132440" />,
      name: "قیفی",
    },
    {
      id: 5,
      icon: <PiIceCreamDuotone size={32} color="#132440" />,
      name: "وانیلی",
    },
    {
      id: 6,
      icon: <GiFruitBowl size={32} color="#132440" />,
      name: "میوه ای",
    },
  ];

  const products = [
    {
      id: 1,
      src: "/ice-cream.png",
      name: "بستنی عروسکی ",
      price: "120000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 2,
      src: "/ice-cream.png",
      name: "بستنی شکلاتی",
      price: "120000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 3,
      src: "/ice-cream.png",
      name: "بستنی میوه ای",
      price: "150000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 4,
      src: "/ice-cream.png",
      name: "بستنی وانیلی",
      price: "180000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 5,
      src: "/ice-cream.png",
      name: "بستنی شکلات کارامل",
      price: "130000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 6,
      src: "/ice-cream.png",
      name: "بستنی دبی چاکلت",
      price: "160000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
  ];
  return (
    <div className=" flex flex-col w-full h-auto min-h-[150vh] bg-[#FFFCFB] ">
      <Header />
      <section className=" flex flex-col gap-[3%] w-full h-auto pt-[5.5rem] ">
        <h3 className=" text-[#132440] text-[24px] w-full text-center py-3 ">
          دسته بندی ها
        </h3>
        <section className=" carousel w-full overflow-x-scroll h-[4.5rem] flex flex-row gap-[0.5rem] px-[3%]  ">
          {List?.map((item, index) => {
            return (
              <div
                key={index}
                className={`carousel-item place-items-center px-[2%] !w-[6rem] bg-[#d6ecff]  border-[0.5px] border-[#132440] h-[1.5rem] py-2 rounded-4xl flex flex-row justify-between `}
              >
                <span className={` text-[#132440] text-[16px] `}>
                  {item.name}{" "}
                </span>
                {item.icon}
              </div>
            );
          })}
        </section>
        <div className=" grid grid-cols-2 w-full h-auto gap-x-[1rem] gap-y-[1rem] place-items-center px-[3%] mt-[2rem] ">
          {products?.map((item, index) => {
            const tomanPrice = new Intl.NumberFormat("fa-IR").format(
              item.price
            );
            return (
            <ProductCard id={item.id} key={index} src={item.src} tomanPrice={tomanPrice} name={item.name} price={item.price} oldprice={item.oldprice} desc={item.desc} text={item.text} />
            );
          })}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default page;
