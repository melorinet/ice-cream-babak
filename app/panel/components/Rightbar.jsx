"use client"
import React,{useState} from 'react'
import { MdDashboard } from "react-icons/md";
import { MdOutlineTableChart } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { IoCalendarNumberOutline } from "react-icons/io5";
// import postCategory from "@/app/panel/config/sample-post-category.json"
import postCategory from "../config/sample-post-category.json"
import subMenu_menu from "../config/sample-menu.json"
import banner_subMenu from "../config/banner_submenu.json"
import { MdChevronLeft } from "react-icons/md";
import { TiChevronLeftOutline } from "react-icons/ti";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';


const Rightbar = (props) => {
  const [ShowSubMenu, setShowSubMenu] = useState({id:"",show:false})
  const PostCatSubMenu= [
    {
      id:1,
      name:"بخش بندی",
      key:"category"
    },
    {
      id:2,
      name:"پست های",
      key:"post"
    }
  ]
    const PostCatTeamSubMenu= [
    {
      id:1,
      name:"بخش بندی",
      key:"category"
    },
    {
      id:2,
      name:"ایجاد عضو جدید",
      key:"post"
    }
  ]

  const settingSubMenu =[
    {
      id:1,
      name:"لیست تنظیمات",
      key:""
    },
    {
      id:2,
      name:"ایجاد تنظیم جدید",
      key:"create"
    }
  ]
  return (
    <ul className=' flex max-sm:hiddden flex-col bg-white  w-[18rem] h-auto min-h-[20vh] pb-[10rem] rounded-[30px] shadow-md shadow-gray-400  py-[2rem]  ' >
     <Link href={"/panel/dashboard"} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdDashboard size={24} color='#99a1af' /><h1>داشبورد</h1></Link> 
      {postCategory.map((item,index)=>{
       const isOpen = ShowSubMenu.show && ShowSubMenu.id === item.key;

        return (
          <div className={`${item.isactive ? ` `:` hidden`}`} key={index}>
            {/* Main menu item */}
            <li
              onClick={() =>
                setShowSubMenu({
                  id: item.key,
                  show: !isOpen, // toggle open/close
                })
              }
              className="relative flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
            >
              <MdOutlineTableChart size={24} color="#99a1af" />
              <h1 className= {`text-zinc-600 text-[16px] font-medium  `} >مدیریت {item.name}</h1>
              {isOpen ? (
                <MdOutlineKeyboardArrowDown
                  color="#99a1af"
                  size={20}
                  className="absolute left-1"
                />
              ) : (
                <MdChevronLeft color="#99a1af" size={20} className="absolute left-1" />
              )}
            </li>

            {/* Submenu with animation */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.section
                  key="submenu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full px-[2rem] overflow-hidden"
                >
                  {item.key === "menu" && (
                    <ul>
                      {subMenu_menu.map((sub, subIndex) => (
                        <Link href={`/panel/menu/${sub.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                          منوی {sub.name}
                        </Link>
                      ))}
                    </ul>
                  )}
                   {item.key === "blog" && (
                    <ul>
                      {PostCatSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${sub.key}/${item.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} {item.name} 
                        </Link>
                      ))}
                    </ul>
                  )}
                    {item.key === "post" && (
                    <ul>
                      {PostCatSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${sub.key}/${item.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} {item.name} 
                        </Link>
                      ))}
                    </ul>
                  )}
                  {item.key === "gallery" && (
                    <ul>
                      {PostCatSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${sub.key}/${item.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} {item.name} 
                        </Link>
                      ))}
                    </ul>
                  )}
                  {item.key === "article" && (
                    <ul>
                      {PostCatSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${sub.key}/${item.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} {item.name} 
                        </Link>
                      ))}
                    </ul>
                  )}
                  {item.key === "product" && (
                    <ul>
                      {PostCatSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${sub.key}/${item.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} {item.name} 
                        </Link>
                      ))}
                    </ul>
                  )}
                   {item.key === "service" && (
                    <ul>
                      {PostCatSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${sub.key}/${item.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} {item.name} 
                        </Link>
                      ))}
                    </ul>
                  )}
                   {item.key === "team" && (
                    <ul>
                      {PostCatTeamSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${sub.key}/${item.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} {item.name} 
                        </Link>
                      ))}
                    </ul>
                  )}
                  {item.key === "banner" && (
                      <ul>
                      {banner_subMenu.map((sub, subIndex) => (
                        <Link href={`/panel/banner/${sub.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                           {sub.name}
                        </Link>
                      ))}
                    </ul>
                  )}
                  {item.key === "setting" && (
                            <ul>
                      {settingSubMenu.map((sub, subIndex) => (
                        <Link href={`/panel/${item.key}/${sub.key}`}
                        // onClick={()=> props.changeActivePage(sub.key)}
                        
                          key={subIndex}
                          className="flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem] pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px]"
                        >
                          <TiChevronLeftOutline color='#71717b' size={18} />
                         {sub.name} 
                        </Link>
                      ))}
                    </ul>
                  )

                  }
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        );
      })}
     <Link href={"/panel/dataaTable"} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdDashboard size={24} color='#99a1af' /><h1>جدول داد ه ها</h1></Link> 
     <Link href={"/panel/forms"} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdDashboard size={24} color='#99a1af' /><h1>فرم ها</h1></Link> 
     <Link href={"/panel/ckeditor"} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdDashboard size={24} color='#99a1af' /><h1>ckEditor</h1></Link> 
     <Link href={"/panel/calendar"} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdDashboard size={24} color='#99a1af' /><h1>تقویم فارسی</h1></Link> 


      {/* {postCategory.map((item,index)=>{
        return(
          <div key={index}>
     <li onClick={()=> setShowSubMenu({id:item.key,show:true})} className=' relative flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdOutlineTableChart size={24} color='#99a1af' /><h1>{item.name} </h1> {ShowSubMenu.show && ShowSubMenu.id === item.key ? <MdOutlineKeyboardArrowDown color='#99a1af' size={20}  className=' absolute left-1' />  : <MdChevronLeft color='#99a1af' size={20}  className=' absolute left-1' />} </li> 
     { ShowSubMenu.show && ShowSubMenu.id === item.key &&
      (<section className=' w-full px-[2rem] h-auto  ' >
      {item.key === "menu" && 
        <ul>
        {subMenu_menu.map((item,index)=>{
          return(
            <li className=' flex w-[94%] text-zinc-500 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><TiChevronLeftOutline />{item.name} </li>
          )
        })}
        </ul>
      }
     </section>)}
</div>
        )
      })} */}
     {/* <li onClick={()=> props.changeActivePage("dashboard")} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdDashboard size={24} color='#99a1af' /><h1>داشبورد</h1></li> 
     <li onClick={()=> props.changeActivePage("dataTable")} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><MdOutlineTableChart size={24} color='#99a1af' /><h1>جدول داده ها</h1></li> 
     <li onClick={()=> props.changeActivePage("forms")} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><FaWpforms size={24} color='#99a1af' /><h1>فرم ها</h1></li>   
     <li onClick={()=> props.changeActivePage("CKeditor")} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><TiEdit size={24} color='#99a1af' /><h1>ck editor</h1></li> 
     <li onClick={()=>props.changeActivePage("calendar")} className=' flex w-[94%] text-zinc-600 self-center flex-row gap-[1.5rem] place-items-center h-[3rem]  pr-[2.563rem] hover:cursor-pointer active:bg-gray-200 rounded-[30px] '><IoCalendarNumberOutline size={24} color='#99a1af' /><h1>تقویم فارسی</h1></li>    */}
    </ul>
  )
}

export default Rightbar