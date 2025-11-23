"use client"
import React from 'react'
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);



const Dashboard = () => {
    // Shared data
  const labels = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];

  const data = {
    labels,
    datasets: [
      {
        label: "تعداد",
        data: [12, 19, 3, 5, 2, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const reportscards=[
    {
      id:1,
      title:"تعداد بازدید روزانه",
      amount:"30k"
    },
    {
      id:2,
      title:"تعداد بازدید ماهانه",
      amount:"100k"
    },
    {
      id:3,
      title:"تعداد کاربر ثبت نام شده",
      amount:"1k"
    },
    {
      id:4,
      title:"بیشترین فروش",
      amount:"20,000"
    }

  ]
  return (
    <div className=' w-full h-auto min-h-[100vh] bg-white rounded-[10px] flex flex-col pt-[2rem] ' >
        <section className=' flex flex-row max-sm:flex-col max-sm:gap-2 justify-around place-items-center w-full h-[10rem] ' >
          {reportscards?.map((item,index)=>{
            return(
              <div key={index} className={` place-items-center place-content-center gap-[2rem] h-[9rem] w-[17rem] rounded-[10px] bg-gradient-to-br ${index % 2 === 0 ? ` from-violet-200 to-blue-400`:` from-green-200 to-orange-300`} `} >
                <h3 className=' text-zinc-700 text-[16px] font-normal ' >{item.title} </h3>
                <h5 className=' text-zinc-700 text-[16px] font-normal ' >{item.amount} </h5>
              </div>
            )
          })
          }
       
        </section>
           <div className=' grid grid-cols-2 max-sm:flex max-sm:flex-col max-sm:mt-[2rem] gap-[1rem] w-full h-full  ' >
 {/* Pie Chart */}
      <div className="bg-white shadow-lg p-4 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2 text-zinc-700 ">بیشترین فروش</h2>
        <Pie data={data} />
      </div>

 {/* Bar Chart */}
      <div className="bg-white shadow-lg p-4 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2 text-zinc-700">تعداد بازدید ماهانه</h2>
        <Bar data={data} />
      </div>
         {/* Line Chart */}
      <div className="bg-white shadow-lg p-4 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2 text-zinc-700">تعداد بازدید روزانه</h2>
        <Line data={data} />
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white shadow-lg p-4 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2 text-zinc-700"> ثبت نام کاربر</h2>
        <Doughnut data={data} />
      </div>
      </div>
    </div>
  )
}

export default Dashboard