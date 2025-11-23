import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=' fixed bottom-0 w-full px-[2rem] py-[1rem] place-items-center h-fit text-zinc-600 bg-gray-100 rounded-t-3xl flex flex-row  ' >
      <FaRegCopyright size={14} color='#000' className=' ml-2' />شرکت ساتیار پژوهان
    </footer>
  )
}

export default Footer