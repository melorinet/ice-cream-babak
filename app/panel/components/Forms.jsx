"use client"
import React,{useState} from 'react'
import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const Forms = () => {
  const [date, setdate] = useState("")
  const handleChange=(v)=>{
    setdate(v)
  }
  return (
    <div className=' rounded-[10px] bg-white w-full h-full text-zinc-800 ' >
            <input type="tel" placeholder='فیلد ۱' className=' text-zinc-500 focus:border-zinc-800 w-full h-[3rem] bg-white border border-zinc-500 rounded-[10px] px-[2rem] text-right ' />
            <h3>انتخاب تاریخ</h3>
<DatePicker 
  value={date}
  onChange={handleChange}
  className='text-zinc-700  '
    format="MM/DD/YYYY"
    calendar={persian}
      locale={persian_fa}
  
/>
    </div>
  )
}

export default Forms