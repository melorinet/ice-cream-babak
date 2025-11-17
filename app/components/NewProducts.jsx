import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

const NewProducts = () => {
  const NewProductsList = [
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
    <div className=" flex flex-col w-full h-auto min-h-[8rem] gap-[0.5rem]  px-[3%] mt-[0.7rem] ">
      <div className=" w-full  h-fit flex flex-row justify-between  place-items-center ">
        <h3 className="  bg-[#FFFCFB] text-[#132440] text-[18px]  ">
          جدید ترین ها
        </h3>
      <Link href={`/landing/moreProducts/${"جدیدترین ها"}`} ><h3 className=" text-[#093FB4] text-[16px] ">مشاهده بیشتر</h3></Link>
      </div>
      <div className=" w-full carousel h-auto min-h-[26vh] overflow-visible gap-4  px-2 place-items-center flex overflow-x-scroll ">
        {NewProductsList?.map((item,index)=>{
          const tomanPrice = new Intl.NumberFormat('fa-IR').format(item.price); 
          return(
           <ProductCard id={item.id} key={index} src={item.src} tomanPrice={tomanPrice} name={item.name} price={item.price} oldprice={item.oldprice} desc={item.desc} text={item.text} />

          )
        })

        }
      </div>
    </div>
  );
};

export default NewProducts;
