import React from 'react'
import { TbIceCream } from "react-icons/tb";
import { IoIceCreamOutline } from "react-icons/io5";
import { LuIceCreamBowl } from "react-icons/lu";
import { GiChocolateBar } from "react-icons/gi";
import { PiIceCreamDuotone } from "react-icons/pi";
import { GiFruitBowl } from "react-icons/gi";


const Categories = () => {
    const List =[
        {
            id:1,
            icon:<TbIceCream size={32} color='#132440' />,
            name:"چوبی"
        },
         {
            id:2,
            icon:<LuIceCreamBowl size={32} color='#132440' />,
            name:"لیوانی"
        },
        {
            id:3,
            icon:<GiChocolateBar size={32} color='#132440' />,
            name:"شکلاتی"
        },
        {
            id:4,
            icon:<IoIceCreamOutline size={32} color='#132440' />,
            name:"قیفی"
        },
        {
            id:5,
            icon:<PiIceCreamDuotone size={32} color='#132440' />,
            name:"وانیلی"
        },
        {
            id:6,
            icon:<GiFruitBowl size={32} color='#132440' />,
            name:"میوه ای"
        }
    ]
  return (
    <div className=' flex flex-col w-full h-auto min-h-[8rem] gap-[1rem]  px-[3%] mt-[2.5rem] ' >
        <div className=' w-full  h-[3.5rem] flex flex-row justify-between  place-items-center ' >
            <h3 className=' text-[#132440] text-[18px] ' >دسته بندی ها</h3>
            <h3 className=' text-[#093FB4] text-[16px] ' >مشاهده بیشتر</h3>
        </div>
        <section  className=' carousel w-full overflow-x-scroll h-[4.5rem] flex flex-row gap-[0.5rem]  ' >
            {List?.map((item,index)=>{
                return(
                  <div key={index} className={`carousel-item place-items-center px-[2%] !w-[6rem] bg-[#d6ecff]  border-[0.5px] border-[#132440] h-[1.5rem] py-2 rounded-4xl flex flex-row justify-between `} >
                    <span className={` text-[#132440] text-[16px] `} >{item.name} </span>
                    {item.icon}
                  </div>  
                )
            })}
        </section>

    </div>
  )
}

export default Categories