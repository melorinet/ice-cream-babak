import React from 'react'
import Link from 'next/link'
import { IoStorefrontOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { TbBrandCraft } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { RiDiscountPercentLine } from "react-icons/ri";

const BottomNav = () => {
  return (
    <div className=' w-[96%] fixed grid grid-cols-4 gap-0 border-t-[0.3px] border-t-[#132440] justify-between place-content-center place-items-center self-center h-[5rem] bottom-1 rounded-b-3xl bg-[url(/meltedBottom.png)] bg-no-repeat bg-cover bg-right bg-[#218eff] shadow-md shadow-zinc-600 ' >
        <Link href={"/landing"} className=' w-[4rem] h-[4rem] rounded-full bg-[#FFFCFB] place-content-center place-items-center absolute -top-5 shadow-zinc-700 drop-shadow-2xl border border-[#093FB4] active:animate-pulse drop-shadow-zinc-700 left-1/2 -translate-x-1/2 '>
          <IoStorefrontOutline size={24} color='#093FB4' className='active:animate-pulse' />
        </Link>

        <Link href={"/landing"} className='  h-[5rem] place-content-center place-items-center border-l border-l-[#FFFCFB] w-full rounded-r-3xl ' >
          <BsPerson size={35} color='#FFFCFB' />
        </Link>
        <Link href={"/landing"} className='  h-[5rem] place-content-center place-items-center w-full  ' >
        <TbBrandCraft size={35} color='#FFFCFB' />
        </Link>
        <Link href={"/landing"} className='  border-r border-r-[#FFFCFB] h-[5rem] place-content-center place-items-center w-full  ' >
        <BiCategory size={35} color='#FFFCFB'/>
        </Link>
          <Link href={"/landing"} className='  border-r border-r-[#FFFCFB] h-[5rem] place-content-center place-items-center w-full rounded-l-3xl  ' >
        <RiDiscountPercentLine size={35} color='#FFFCFB'/>
        </Link>
    </div>
  )
}

export default BottomNav