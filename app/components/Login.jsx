"use client"
import Link from 'next/link'
import React,{useState} from 'react'

const Login = () => {
    const [phoneNum, setphoneNum] = useState("")
    const [showCodeSection, setshowCodeSection] = useState(false)
  return (
    <div className=' w-full h-auto min-h-screen bg-[url(/login-bg.webp)] bg-cover bg-center bg-blend-color bg-[#D71313]/60 flex place-content-center place-items-center ' >
       {!showCodeSection ? (
<section className=' w-[94%] h-64 backdrop-blur-md gap-4 bg-white/15 rounded-2xl px-[3%] flex flex-col place-content-center place-items-center ' >
             <input
            type="tel"
            placeholder="شماره تلفن خود را وارد کنید"
            value={phoneNum}
            onChange={(v) => setphoneNum(v.target.value)}
            className=" text-[#132440] focus:border-zinc-800 w-full h-[4rem] bg-[#FFFCFB] border border-[#D71313] rounded-[10px] px-[2rem] text-right "
          />
          <button onClick={()=> setshowCodeSection(true)} className='text-[#FFFCFB] text-[18px] font-semibold drop-shadow-sm drop-shadow-white flex place-content-center place-items-center bg-[#CD2C58] w-full h-[4rem] rounded-2xl ' >
            ارسال کد ورود 
          </button>
        </section>
       ):(
        <section className=' w-[94%] h-64 backdrop-blur-md gap-4 bg-white/15 rounded-2xl px-[3%] flex flex-col place-content-center place-items-center ' >
             <input
            type="tel"
            placeholder="کد ورود به برنامه را وارد کنید"
            value={phoneNum}
            onChange={(v) => setphoneNum(v.target.value)}
            className=" text-[#132440] focus:border-zinc-800 w-full h-[4rem] bg-[#FFFCFB] border border-[#D71313] rounded-[10px] px-[2rem] text-right "
          />
          <Link href={"/landing"} onClick={()=> setshowCodeSection(true)} className='text-[#FFFCFB] text-[18px] font-semibold drop-shadow-sm drop-shadow-white flex place-content-center place-items-center bg-[#CD2C58] w-full h-[4rem] rounded-2xl ' >
            ورود به برنامه
          </Link>
        </section>
       )} 
    </div>
  )
}

export default Login