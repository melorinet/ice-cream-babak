
import React from 'react'
import Link from "next/link";
// import Rightbar from '@/app/panel/components/Rightbar';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CreateMenu from '../../../components/CreateMenu';

const page =async ({params}) => {
    const {position} =await params;
  
  return (
     <main className=" w-full flex flex-col text-zinc-500 pb-[10rem] gap-[1rem] h-auto min-h-[100vh]   bg-[#E5E5E5] ">
      <Header />
   <CreateMenu position={position} />
      <Footer />
    </main>
  )
}

export default page