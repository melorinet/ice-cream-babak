"use client";
import React, { useState, useRef, useEffect } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { BsPerson } from "react-icons/bs";
import { LuShoppingBasket } from "react-icons/lu";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { TbBrandSketch } from "react-icons/tb";
import { MdOutlineSell } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { usePathname } from "next/navigation";
import useBasketStore from "../store/basketStore";

const Header = () => {
  const pathname= decodeURIComponent(usePathname());
  const isActive= (path) => pathname === path;
  const submenuRef = useRef(null);
  const [showRightBar, setshowRightBar] = useState(false);
  // 🧠 Close menu on outside click or touch
  useEffect(() => {
    const handleOutside = (event) => {
      if (
        showRightBar &&
        submenuRef.current &&
        !submenuRef.current.contains(event.target)
      ) {
        setshowRightBar(false);
      }
    };

    // Listen for both click and touch
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [showRightBar]);

  const items = useBasketStore((state) => state.itemsIceCream);
  return (
    <div className=" w-full fixed flex bg-[url(/melted.png)] bg-right bg-cover bg-no-repeat flex-row h-[5rem] place-content-center place-items-center justify-between px-[3%] bg-[#218eff] rounded-b-lg shadow-md shadow-zinc-700 z-20 border-b border-b-[#D71313]/30 ">
      {showRightBar ? (
        <div
          className={`active:animate-ping place-content-center place-items-center  mr-[30%] w-10 h-10 ${
            !showRightBar ? ` hidden pointer-events-none` : ``
          } `}
        ></div>
      ) : (
        <TiThMenuOutline
          color="#FFFCFB"
          size={32}
          className={`active:animate-ping ${
            showRightBar ? `hidden pointer-events-none -z-20 opacity-0 ` : ``
          } `}
          onClick={() => {
            if (showRightBar) return;
            setshowRightBar(true);
          }}
        />
      )}
      <section className=" flex flex-row place-content-center place-items-center gap-5 ">
        <Link href={"/landing/basket"} className=" relative" >
        <div className=" bg-[#D71313]/80 w-[1.3rem] h-[1.3rem] rounded-full absolute -top-3 -right-3 flex place-content-center place-items-center text-[16px] text-[#FFFCFB] " >{items?.length} </div>
        <LuShoppingBasket
          color= {isActive("/landing/basket") ? "#093FB4": "#FFFCFB"}
          size={32}
          className=" active:animate-ping "
        />
        </Link>
        <Link href={"/landing/myprofile"} className=" w-[3.5rem] h-[3.5rem] flex place-content-center place-items-center rounded-full border border-[#FFFCFB] bg-[#218eff] ">
          <BsPerson
            color={isActive("/landing/myprofile") ? "#093FB4":"#FFFCFB"} 
            size={32}
            className=" active:animate-ping "
          />
        </Link>
      </section>

      {showRightBar && (
        <motion.section
          key="submenu"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
          ref={submenuRef}
          className=" absolute top-[5rem] border-l border-l-[#093FB4] p-[4%] rounded-l-3xl  right-0 bg-[#D6ECFF] w-[65%] h-screen   "
        >
          {/* close circle  */}
          <button
            onClick={() => setshowRightBar(false)}
            className=" absolute -left-7 top-7 bg-[#D6ECFF] border-l border-l-[#093FB4] w-[5rem] h-[5rem] rounded-full place-content-end place-items-end "
          >
            <FaChevronRight color="#093FB4" size={22} className=" ml-2" />
          </button>
          <div className=" w-full border-b border-b-[#093FB4] h-[5rem] flex flex-row gap-4 " >
            <section className=" w-[3.5rem] h-[3.5rem] flex place-content-center place-items-center rounded-full border border-[#093FB4] bg-[#D6ECFF] ">
              <BsPerson
                color="#093FB4"
                size={32}
                className=" active:animate-ping "
              />
            </section>
            <span className=" w-[8rem] h-[4rem] place-content-center text-[#093FB4] text-[18px]  pl-5 " >بابک چراغی</span>
          </div>
          <Link onClick={()=> setshowRightBar(false)} href={"/landing"} className={` flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] ${isActive("/landing") ? ` rounded-2xl p-2 bg-[#FFFCFB] `:``} `}  ><MdOutlineHome size={24} color="#093FB4" />خانه</Link>
          <Link onClick={()=> setshowRightBar(false)} href={"/landing/myprofile"} className={`flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] ${isActive(`/landing/myprofile`) ? `rounded-2xl p-2 bg-[#FFFCFB]`:``} `} ><BsPerson size={24} color="#093FB4" />پروفایل من</Link>
          <Link onClick={()=> setshowRightBar(false)} href={`/landing/moreProducts/${"تخفیف های ویژه"}`} className={` flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] ${isActive(`/landing/moreProducts/${"تخفیف های ویژه"}`) ? `rounded-2xl p-2 bg-[#FFFCFB]`:``} `}  ><RiDiscountPercentLine size={24} color="#093FB4" />تخفیف های ویژه</Link>
          <Link onClick={()=> setshowRightBar(false)} href={"/landing/categories"} className= {`flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] ${isActive("/landing/categories") ? `rounded-2xl p-2 bg-[#FFFCFB]`:``} `} ><BiCategory size={24} color="#093FB4" />دسته بندی ها</Link>
          <Link onClick={()=> setshowRightBar(false)} href={"/landing/brands"} className={`flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] ${isActive("/landing/brands") ? ` rounded-2xl p-2 bg-[#FFFCFB] `:``}  `} ><TbBrandSketch size={24} color="#093FB4" />برندها</Link>
          <Link onClick={()=> setshowRightBar(false)}  href={`/landing/moreProducts/${"پر فروش ترین ها"}`}  className={` flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] ${isActive(`/landing/moreProducts/${"پر فروش ترین ها"}`) ? ` rounded-2xl p-2 bg-[#FFFCFB] `:``}  `} ><MdOutlineSell size={24} color="#093FB4" />پرفروش ها</Link>
          <Link onClick={()=> setshowRightBar(false)} href={`/landing/moreProducts/${"جدیدترین ها"}`} className={` flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] ${isActive(`/landing/moreProducts/${"جدیدترین ها"}`) ? ` rounded-2xl p-2 bg-[#FFFCFB] `:``}  `}  ><MdOutlineWatchLater size={24} color="#093FB4" />جدیدترین ها</Link>
          <Link onClick={()=> setshowRightBar(false)} href={"/landing"} className=" flex flex-row w-full gap-2 text-[#093FB4] text-[18px] place-items-start mt-[7%] " ><LuShoppingBasket size={24} color="#093FB4" />سبد خرید</Link>
       
        </motion.section>
      )}
    </div>
  );
};

export default Header;
