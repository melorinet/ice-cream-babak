"use client"
import React from "react";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import useBasketStore from "../store/basketStore";


const ProductCard = (props) => {

   const addNoRepeatedItem = useBasketStore((state) => state.addNoRepeatedItem);
    const AddItemToCart=()=>{
      const product={
        id:props.id,
        name:props.name,
        desc:props.desc,
        count:1,
        price:props.price,
        oldprice:props.oldprice,
        image:props.src,
        text:props.text
      };
      addNoRepeatedItem(product)
      }

  return (
    <div
      
      className=" carousel-item bg-[url(/meltedCard.png)] overflow-hidden bg-cover bg-center w-[11rem] h-[15.4rem] pb-[0.2rem] rounded-md flex flex-col border-[0.5px] place-items-center border-[#CD2C58] shadow-md shadow-zinc-500 "
    >
      {/* <img src={item.src} alt="ice-cream" className=" w-[6.5rem] h-[6rem] rounded-full overflow-hidden border self-center -mt-7 shadow-sm shadow-zinc-400 " /> */}
      <img
        src={props.src}
        alt="ice-cream"
        className="w-[6.5rem] h-[6rem] object-contain rounded-full border self-center mt-[3%] "
      />

      <h3 className=" text-[#132440] text-[16px] font-normal mt-[3%] ">
        {props.name}{" "}
      </h3>
      <div className=" w-full flex flex-row-reverse justify-between px-[3%] mt-[7%] ">
        <h3 className=" text-[#132440] text-[14px] font-bold ">
          {props.tomanPrice}تومان{" "}
        </h3>
        <span className=" text-[#132440] text-[14px] font-bold ">
          قیمت اصلی{" "}
        </span>
      </div>

      <div className=" w-full flex flex-row-reverse justify-between px-[3%] ">
        <h3 className=" text-[#132440] text-[14px] line-through ">
          {props.tomanPrice}تومان{" "}
        </h3>
        <span className=" text-[#132440] text-[12px]  ">قیمت جلد</span>
      </div>
      <div className=" w-full flex flex-row-reverse justify-between px-[3%] ">
        <h3 className=" text-[#D71313] text-[14px] ">
          {props.tomanPrice}تومان{" "}
        </h3>
        <span className=" text-[#132440] text-[12px] ">حاشیه سود</span>
      </div>
      <div className=" w-full h-[2rem] grid grid-cols-2 mt-[3%] px-[3%] gap-2 ">
        <button onClick={()=>AddItemToCart()} className=" w-full h-full shadow-2xs shadow-zinc-700 text-[#FFFCFB] text-[12px] rounded-md bg-[#D71313]/95 active:bg-red-400 flex flex-col place-content-center place-items-center  ">
          <FaPlus color="#FFFCFB" size={14} />
        </button>
        <Link href={`/landing/singleProduct/${props.id}`} className=" w-full h-full shadow-2xs shadow-zinc-700 bg-[#D71313]/95 active:bg-red-400 rounded-md flex flex-row place-content-center place-items-center gap-3 ">
          <FaEye color="#FFFCFB" size={14} />
        </Link>
      </div>
     
    </div>
  );
};

export default ProductCard;
