"use client"
import Link from "next/link";
import React,{useState} from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import Rightbar from "./Rightbar";
import { MdDashboard } from "react-icons/md";
import { MdOutlineTableChart } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import useuserNameStore from "../store/userNameStore";
import usephoneNumStore from "../store/phoneNumStore";
import usetokenStore from "../store/tokenStore";
import useuidStore from "../store/uidStore";
import { useRouter } from "next/navigation";


const Header = () => {
  const router=useRouter()
  const [showDropDown, setshowDropDown] = useState(false)
  const [showNotificationModal, setshowNotificationModal] = useState(false)
  const [showMessagesModal, setshowMessagesModal] = useState(false)
  const [responsiveRightbar, setresponsiveRightbar] = useState(false)
  const username = useuserNameStore((state)=>state.MelouserName)
  const resetPhoneNum= usephoneNumStore((state)=>state.resetStorage);
  const resetToken=usetokenStore((state)=>state.resetStorage);
  const resetUid= useuidStore((state)=>state.resetStorage);
  const resetUsername=useuserNameStore((state)=>state.resetStorage)
  const token= usetokenStore((state)=>state.Melotoken)
  const LogOut=()=>{
    resetPhoneNum()
    resetToken()
    resetUid()
    resetUsername()
    router.push("/panel");
  }
  return (
    <div className="   w-full relative flex flex-row px-[2rem] h-[4rem] bg-white place-items-center rounded-b-[10px] drop-shadow-sm drop-shadow-gray-400 ">
     <div className= {` ${showDropDown ? ` flex`:`hidden`} w-full h-[100vh] absolute bg-[rgba(0,0,0,0.4)] top-[4rem] bottom-0 right-0 left-0  `} >
       <section className={`  w-[15rem] h-[10rem] absolute rounded-[10px] border border-white bg-[#fff] top-[0.4rem] right-[3rem] flex-col gap-[2rem]  text-white `} >
        <Link href={"/"} className= {`w-full flex hover:cursor-pointer hover:bg-gray-300 rounded-[10px] h-[3rem] place-items-center place-content-start  px-[1rem] text-zinc-700 ${token ? ` hidden`:`flex`} `} ><IoLogIn size={24} color="#292929" className=" ml-2 " />ورود به سیستم</Link>
      <button onClick={()=>{LogOut()} } className= {`w-full flex hover:cursor-pointer hover:bg-gray-300 rounded-[10px] h-[3rem] place-items-center place-content-start  px-[1rem] text-zinc-700 ${token ? ` flex`:` hidden`}  `} >خروج</button>
       </section>
     </div>
     <div className= {` ${showNotificationModal ? ` flex`:`hidden`} w-full h-[100vh] absolute bg-[rgba(0,0,0,0.4)] top-[4rem] bottom-0 right-0 left-0  `} >
       <section className={`  w-[15rem] h-[10rem] absolute rounded-[10px] border border-white bg-[#fff] top-[0.4rem] left-[3rem] flex-col gap-[2rem]  text-white `} >
       </section>
     </div>
       <div className= {` ${showMessagesModal ? ` flex`:`hidden`} w-full h-[100vh] absolute bg-[rgba(0,0,0,0.4)] top-[4rem] bottom-0 right-0 left-0  `} >
       <section className={`  w-[15rem] h-[10rem] absolute rounded-[10px] border border-white bg-[#fff] top-[0.4rem] left-[1rem] flex-col gap-[2rem]  text-white `} >
       </section>
     </div>
    <div className=" w-[3rem] h-[3rem] flex place-content-center active:bg-gray-200 rounded-full place-items-center " > <IoMenu onClick={()=> setresponsiveRightbar(!responsiveRightbar)} size={26} color="#000" className="  rounded-full lg:hidden  " /></div>
      <img
        src="/prfimg.png"
        alt="prf"
        className=" max-sm:hidden w-[2.5rem] h-[2.5rem] rounded-full "
      />
      <div onClick={()=>setshowDropDown(!showDropDown)} className="relative w-[10rem] h-[94%] self-center hover:cursor-pointer active:bg-gray-200 flex flex-row place-items-center rounded-[10px] mr-[2rem] " >
       {token ? <h5 className=" mr-[2rem] font-bold text-zinc-600 ">{username} </h5>: <h5 className=" mr-[2rem] font-bold text-zinc-600 ">کاربر مهمان </h5>} 
        <FaCaretDown color="#52525c" size={24} className=" " />
      </div>
      
      <div className=" w-[10rem] h-full left-0 absolute flex flex-row place-content-center gap-[2rem] place-items-center " >
        <IoMdNotificationsOutline onClick={()=> setshowNotificationModal(!showNotificationModal)} size={26} color="#52525c" className=" " />
        <IoMailOutline onClick={()=> setshowMessagesModal(!showMessagesModal)} size={26} color="#52525c" className=" " />
      </div>
      <AnimatePresence  >
      {/* {responsiveRightbar && (
   <motion.ul
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-[4rem] inset-0 right-0 z-[999999999] bg-white w-[18rem] h-screen rounded-l-[30px] shadow-md shadow-gray-400 flex flex-col"
    >
         <ul className=' z-[99999999999] flex flex-col  absolute right-0  bg-white  w-[18rem] h-auto min-h-[100vh] rounded-[30px] shadow-md shadow-gray-400  py-[2rem]  ' >
             <li onClick={()=> {props.changeActivePage("dashboard");setresponsiveRightbar(false)}} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdDashboard size={24} color='#99a1af' /><h1>داشبورد</h1></li> 
             <li onClick={()=> {props.changeActivePage("dataTable");setresponsiveRightbar(false)}} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdOutlineTableChart size={24} color='#99a1af' /><h1>جدول داده ها</h1></li> 
             <li onClick={()=> {props.changeActivePage("forms");setresponsiveRightbar(false)}} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><FaWpforms size={24} color='#99a1af' /><h1>فرم ها</h1></li>   
             <li onClick={()=> {props.changeActivePage("CKeditor");setresponsiveRightbar(false)}} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><TiEdit size={24} color='#99a1af' /><h1>ck editor</h1></li> 
             <li onClick={()=>{props.changeActivePage("calendar");setresponsiveRightbar(false)}} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><IoCalendarNumberOutline size={24} color='#99a1af' /><h1>تقویم فارسی</h1></li>   
            </ul>
      </motion.ul>
      )} */}
      </AnimatePresence>
    </div>
  );
};

export default Header;
