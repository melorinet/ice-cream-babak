import React from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
// import CreateMenu from '@/app/panel/components/CreateMenu';
import CreateCategory from '../../../components/CreateCategory';

const page = async({params}) => {
const {type} = await params
  return (
    <main className=" w-full flex flex-col text-zinc-500  gap-[1rem] h-auto min-h-[110vh] pb-[10rem]   bg-[#E5E5E5] ">
      <Header />
   {/* <CreateMenu position={position} /> */}
   <CreateCategory type={type} />
      <Footer />
    </main>
  )
}

export default page