import React from "react";
import Image from "next/image";
import Link from "next/link";



export default async function page({ params }) {
  const { pay, t } = await params;
  return (
    <div className=" z-50 text-right flex place-content-center place-items-center w-[100vw] self-center h-[100vh] bg-[rgba(0,0,0,0.6)] pt-0 pb-0 pr-0 pl-0 absolute top-0 ring-0 left-0 bottom-0 ">
      <section className=" bg-green-700 w-[70%] h-[70%] flex flex-col gap-8 pt-5 place-items-center ">
        {pay === "1" ? 
          <>
            <Image
              src={"/tick-circle.png"}
              width={800}
              height={0}
              alt="ok"
              quality={100}
              className=" h-auto w-[15%] "
            />
            <h1 className=" text-white font-semibold text-[16px] ">
              پرداخت شما با موفقیت انجام شد{" "}
            </h1>
            <h1 className="text-white font-light text-[12px]">
              از اینکه اینپرده را انتخاب کردید سپاسگزاریم
            </h1>
            <h1 className="text-white font-light text-[12px]">
              کد رهگیری سفارش شما 
            </h1>
            <h1 className="text-white font-light text-[12px]">
              {t}
            </h1>
            <Link href={""} className=" bg-green-200 text-[#FEF4F1] text-[14px] font-semibold w-[60%] py-5 rounded-[5px] hover:drop-shadow-2xl shadow-zinc-600 flex place-content-center place-items-center ">
              مشاهده سفارشات
            </Link>
           
          </>
       : 
          <>
            <Image
              src={"/close-square.png"}
              width={800}
              height={0}
              alt="ok"
              quality={100}
              className=" h-auto w-[15%] "
            />
            <h1 className=" text-white font-semibold text-[16px] ">
              پرداخت شما با خطا مواجه شد{" "}
            </h1>
            <h1 className="text-white font-light text-[12px]">
              اگر مبلغی از حساب شما کسر گردیده ظرف ۲۴ ساعت آیند به حسابتان واریز
              خواهد شد
            </h1>
          </>
        }
      </section>
    </div>
  );
}
