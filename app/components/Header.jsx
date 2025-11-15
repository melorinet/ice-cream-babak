"use client";
import React, { useState, useRef, useEffect } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { BsPerson } from "react-icons/bs";
import { LuShoppingBasket } from "react-icons/lu";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";

const Header = () => {
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
        <LuShoppingBasket
          color="#FFFCFB"
          size={32}
          className=" active:animate-ping "
        />
        <section className=" w-[3.5rem] h-[3.5rem] flex place-content-center place-items-center rounded-full border border-[#FFFCFB] bg-[#218eff] ">
          <BsPerson
            color="#FFFCFB"
            size={32}
            className=" active:animate-ping "
          />
        </section>
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
        </motion.section>
      )}
    </div>
  );
};

export default Header;
