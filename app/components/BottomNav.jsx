"use client"
import React from 'react'
import Link from 'next/link'
import { IoStorefrontOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { TbBrandCraft } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { usePathname } from 'next/navigation';

const BottomNav = () => {
  const pathname = decodeURIComponent(usePathname());
   // Helper to check if a link is active
  const isActive = (path) => pathname === path;

  return (
    <div className=' w-[96%] fixed grid grid-cols-4 gap-0 border-t-[0.3px] border-t-[#132440] justify-between place-content-center place-items-center self-center h-[5rem] bottom-1 rounded-b-3xl bg-[url(/meltedBottom.png)] bg-no-repeat bg-cover bg-right bg-[#218eff] shadow-md shadow-zinc-600 ' >
        <Link href={"/landing"} className=' w-[4rem] h-[4rem] rounded-full bg-[#FFFCFB] place-content-center place-items-center absolute -top-[2rem] shadow-zinc-700 drop-shadow-2xl border border-[#093FB4] active:animate-pulse drop-shadow-zinc-700 left-1/2 -translate-x-1/2 '>
          <IoStorefrontOutline size={24} color='#093FB4' className='active:animate-pulse' />
        </Link>

        <Link href={"/landing/myprofile"} className={` ${isActive("/landing/myprofile") ? `bg-[#FFFCFB] text-[#093FB4] `:`` }  h-[5rem] flex flex-col gap-[1.5%] place-content-center place-items-center border-l border-l-[#FFFCFB]/40 w-full rounded-br-3xl `} >
          <BsPerson size={35} color={isActive("/landing/myprofile") ? `#093FB4`:`'#FFFCFB'`} />
          <span className={`text-[12.5px] ${isActive("/landing/myprofile") ? `text-[#093FB4] `:`text-[#FFFCFB]`}`} >پروفایل من</span>
        </Link>
        <Link href={"/landing/brands"} className= {` ${isActive("/landing/brands") ? `bg-[#FFFCFB] text-[#093FB4] `:`` } h-[5rem] flex flex-col gap-[1.5%] place-content-center place-items-center w-full`}   >
        <TbBrandCraft size={35} color={isActive("/landing/brands") ? `#093FB4`:`'#FFFCFB'`}  />
          <span className= {`text-[12.5px] ${isActive("/landing/brands") ? `text-[#093FB4] `:`text-[#FFFCFB]`}  `}  >برند ها</span>
        </Link>
        <Link href={"/landing/categories"} className={` ${isActive("/landing/categories") ? `bg-[#FFFCFB] text-[#093FB4] `:`` } border-r border-r-[#FFFCFB]/40 h-[5rem] flex flex-col gap-[1.5%] place-content-center place-items-center w-full `}  >
        <BiCategory size={35} color={isActive("/landing/categories") ? `#093FB4`:`'#FFFCFB'`}/>
          <span className={`text-[12.5px]  ${isActive("/landing/categories") ? `text-[#093FB4] `:`text-[#FFFCFB]`} `}  >دسته بندی</span>
        </Link>
          <Link href={`/landing/moreProducts/${"تخفیف های ویژه"}`} className= {` ${isActive(`/landing/moreProducts/${"تخفیف های ویژه"}`) ? `bg-[#FFFCFB] text-[#093FB4] `:`` } border-r border-r-[#FFFCFB]/40 h-[5rem] flex flex-col gap-[1.5%] place-content-center place-items-center w-full rounded-bl-3xl `}  >
        <RiDiscountPercentLine size={35} color={isActive(`/landing/moreProducts/${"تخفیف های ویژه"}`) ? `#093FB4`:`'#FFFCFB'`}/>
          <span className= {`text-[12.5px] ${isActive(`/landing/moreProducts/${"تخفیف های ویژه"}`) ? `text-[#093FB4] `:`text-[#FFFCFB]`}  `}>تخفیفات</span>
        </Link>
    </div>
  )
}

export default BottomNav