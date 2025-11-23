import React from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CreatePost from '../../../components/CreatePost';

const page = async({params}) => {
const {type} = await params
  return (
    <main className=" w-full flex flex-col text-zinc-500 pb-[10rem]  gap-[1rem] h-auto min-h-[100vh]   bg-[#E5E5E5] ">
      <Header />
   {/* <CreateMenu position={position} /> */}
   <CreatePost type={type} />
      <Footer />
    </main>
  )
}

export default page