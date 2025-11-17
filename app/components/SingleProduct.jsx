"use client"
import React from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const SingleProduct = (props) => {
    const router = useRouter();
  return (
    <div className=" w-full h-auto min-h-screen  pb-[10rem] flex flex-col bg-[#FFFCFB] ">
      <section className=" bg-[#218EFF] bg-[url(/melted.png)] bg-center bg-contain bg-no-repeat  w-full h-[27rem] rounded-b-[100px] relative ">
        <button onClick={() => router.back()} className="bg-[#FFFCFB] w-[4rem] h-[4rem] absolute self-end top-[5%] left-[5%] drop-shadow-md drop-shadow-zinc-700 border border-[#218EFF] rounded-full place-content-center place-items-center  ">
          <IoChevronBackOutline size={24} color="#218EFF" />
        </button>
        <img
          src="/ice-cream.png"
          alt="productimg"
          className=" w-[14rem] h-[14rem] object-contain border absolute bottom-4 left-1/2 -translate-x-1/2 "
        />
      </section>
      <section className=" w-full flex flex-row place-items-center  justify-between px-[3%] h-[5rem] mt-3 ">
        <span className=" text-[#132440] text-[24px] ">
          بستنی عروسکی شکلاتی
        </span>
        <div className=" w-[40%] h-full ">
          <div className=" w-full flex flex-row-reverse justify-between px-[3%] mt-[7%] ">
            <h3 className=" text-[#132440] text-[14px] font-bold ">
              {"1220000"}تومان{" "}
            </h3>
            <span className=" text-[#132440] text-[14px] font-bold ">
              قیمت اصلی{" "}
            </span>
          </div>

          <div className=" w-full flex flex-row-reverse justify-between px-[3%] ">
            <h3 className=" text-[#132440] text-[14px] line-through ">
              {"13999999"}تومان{" "}
            </h3>
            <span className=" text-[#132440] text-[12px]  ">قیمت جلد</span>
          </div>
          <div className=" w-full flex flex-row-reverse justify-between px-[3%] ">
            <h3 className=" text-[#D71313] text-[14px] ">{"4889888"}تومان </h3>
            <span className=" text-[#132440] text-[12px] ">حاشیه سود</span>
          </div>
        </div>
        {/* بخش توضیحات  */}
      </section>

      <section>

      <div className=" fixed w-full h-[7rem] bg-[#D6ECFF] bottom-0 place-content-center place-items-center flex " >
        <button className=" w-[94%] h-[5rem] bg-[#D71313]/80  text-[#FFFCFB] flex flex-row-reverse gap-2 rounded-md active:animate-ping place-content-center place-items-center " >افزودن به سبد خرید<FaPlus /></button>

      </div>

      </section>
    </div>
  )
}

export default SingleProduct