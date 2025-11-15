import React from 'react'
import { MdOutlineSearch } from "react-icons/md";

const Searchbar = () => {
  return (
    <div className=' w-full h-[4rem] bg-transparent flex flex-row gap-[1rem] px-[3%] mt-[6rem] ' >
        <input type="search" placeholder='جستجو'
            className=" text-[#132440] focus:border-zinc-800 w-full h-[3rem] bg-[#FFFCFB] border border-[#218eff] rounded-[10px] px-[2rem] text-right "
         ></input>
         <button className=' bg-[#218eff] flex place-content-center active:animate-ping place-items-center w-[5rem] h-[3rem] rounded-2xl ' >
            <MdOutlineSearch color='#FFFCFB' size={24} className=' active:animate-ping ' />
         </button>
    </div>
  )
}

export default Searchbar