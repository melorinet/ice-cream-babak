"use client";
import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { BsPerson } from "react-icons/bs";
import { GiCargoCrate } from "react-icons/gi";
import { FaAngleLeft } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineWhereToVote } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LuShoppingBasket } from "react-icons/lu";
import usetokenStore from "../store/tokenStore";
import useBasketStore from "../store/basketStore";
import usephoneNumStore from "../store/phoneNumStore";
import useuidStore from "../store/uidStore";
import useUniquIdStore from "../store/uniquIdStore";
import useuserNameStore from "../store/userNameStore";
import usebasketIdStore from "../store/basketIdStore";
import usebasketUserCode from "../store/basketUserCode";
import useoffIdStore from "../store/offIdStore";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const router=useRouter();
  const clearStorageToken = usetokenStore((state) => state.resetStorage);
  const clearStorageBasket = useBasketStore((state) => state.resetStorage);
  const clearStorageMobile = usephoneNumStore((state) => state.resetStorage);
  const clearStorageuid = useuidStore((state) => state.resetStorage);
  const clearStorageUniqId = useUniquIdStore((state) => state.resetStorage);
  const clearStorageUserName = useuserNameStore((state) => state.resetStorage);
  const clearoffmoreBasketId= usebasketIdStore((state)=> state.resetStorage);
const clearBasketUserCode= usebasketUserCode((state)=> state.resetStorageIceCream);
const clearOffId= useoffIdStore((state)=> state.resetStorageoffId);
  const token = usetokenStore((state) => state.token);
    const LogOutCleareAllStorage = () => {
    clearStorageToken();
    clearStorageBasket();
    clearStorageMobile();
    clearStorageuid();
    clearStorageUniqId();
    clearStorageUserName();
    clearoffmoreBasketId();
    clearBasketUserCode();
    clearOffId();
    router.push("/",{ shallow: true });
  };
  return (
    <div className=" pb-[10rem] w-full h-auto min-h-screen flex flex-col place-items-center bg-[#FFFCFB] ">
      <Header />
      <section className=" w-full h-[18rem] bg-[url(/melted.png)] bg-center bg-cover bg-no-repeat bg-[#218EFF] pt-[7rem] place-items-center   ">
        <section className=" w-[5.5rem] h-[5.5rem] flex place-content-center place-items-center rounded-full border border-[#FFFCFB] drop-shadow-2xl drop-shadow-zinc-600 shadow-2xl bg-transparent ">
          <BsPerson
            color="#FFFCFB"
            size={32}
            className=" active:animate-ping "
          />
        </section>
        <span className=" self-center w-full flex place-items-center place-content-center mt-[3%] text-[18px] text-[#FFFCFB] text-center " >نام نام خانوادگی</span>
      
      </section>
        <section className=" w-[94%] h-[50vh] py-[7%] px-[3%] flex flex-col rounded-[40px] gap-[1.4rem] drop-shadow-2xl drop-shadow-zinc-600 shadow-2xl shadow-zinc-600  -mt-5 bg-[#D6ECFF] " >
            <div className=" active:bg-blue-200 w-full relative flex flex-row gap-3 place-items-end h-[10%] border-b-[0.5px] py-3 border-b-[#132440]/40 ">  
                <GiCargoCrate size={26} color="#132440" className=" " />
                <span className=" text-[#132440] text-[18px] -mb-1 " >سفارشات من</span>
                <FaAngleLeft size={20} color="#77BEF0" className=" absolute left-3 " />
            </div>
              <div className=" active:bg-blue-200 w-full relative flex flex-row gap-3 place-items-end h-[10%] border-b-[0.5px] py-3 border-b-[#132440]/40 ">  
                <MdOutlineWhereToVote  size={26} color="#132440" className=" " />
                <span className=" text-[#132440] text-[18px] -mb-1 " >پیگیری سفارشات</span>
                <FaAngleLeft size={20} color="#77BEF0" className=" absolute left-3 " />
            </div>
              <Link href={"/landing/profileInfo"} className=" active:bg-blue-200 w-full relative flex flex-row gap-3 place-items-end h-[10%] border-b-[0.5px] py-3 border-b-[#132440]/40 ">  
                <IoLocationOutline size={26} color="#132440" className=" " />
                <span className=" text-[#132440] text-[18px] -mb-1 " > حساب کاربری ،آدرس،ایمیل...</span>
                <FaAngleLeft size={20} color="#77BEF0" className=" absolute left-3 " />
            </Link>
              <div className=" active:bg-blue-200 w-full relative flex flex-row gap-3 place-items-end h-[10%] border-b-[0.5px] py-3 border-b-[#132440]/40 ">  
                <LuShoppingBasket size={26} color="#132440" className=" " />
                <span className=" text-[#132440] text-[18px] -mb-1 " >سبد خرید</span>
                <FaAngleLeft size={20} color="#77BEF0" className=" absolute left-3 " />
            </div>
            <button onClick={()=> LogOutCleareAllStorage()} className=" absolute bottom-1 rounded-b-[40px] flex flex-row-reverse gap-3 text-[18px] text-[#FFFCFB] place-content-center place-items-center self-center bg-[#D71313]/80 w-[97%] active:bg-red-400 rounded-sm h-[3rem] " >
                خروج<IoExitOutline size={20} />
            </button>
        </section>
      <BottomNav />
    </div>
  );
};

export default MyProfile;
