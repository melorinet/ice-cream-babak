import React from "react";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

const ProductCard = (props) => {
  return (
    <Link href={`/landing/singleProduct/${props.id}`} className=" carousel-item bg-[url(/meltedCard.png)] bg-cover bg-center w-[11rem] h-[15rem]   rounded-md flex flex-col border-[0.5px] place-items-center border-[#CD2C58] shadow-md shadow-zinc-500 ">
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
      <button className=" w-full h-[4rem] shadow-2xs shadow-zinc-700 bg-[#D71313] active:bg-red-400 rounded-b-md flex flex-row place-content-center place-items-center gap-3 " >
            افزودن به سبد خرید<FaPlus color="#FFFCFB" size={14} />
      </button>
    </Link>
  );
};

export default ProductCard;
