import React from 'react'

const Brands = () => {
    const brandsList=[
        {
            id:1,
            name:"/mihan.png"
        },
        {
            id:2,
            name:"/daity.png"
        },
        {
            id:3,
            name:"/damdaran.png"
        },
        {
            id:4,
            name:"/gale.png"
        },
        {
            id:5,
            name:"/pak.png"
        },
        {
            id:6,
            name:"/chupan.png"
        }
    ]
  return (
    <div className=' flex flex-col w-full h-auto min-h-[13rem] gap-[0.5rem]  px-[3%] mt-[2.5rem] ' >
         <div className=' w-full  h-[1.5rem] flex flex-row justify-between  place-items-center ' >
            <h3 className=' text-[#132440] text-[18px]  ' >برند های ما</h3>
            <h3 className=' text-[#093FB4] text-[16px] ' >مشاهده بیشتر</h3>
        </div>
        <section  className=' grid grid-cols-3 place-content-center place-items-center  w-full overflow-x-scroll h-[11.5rem] gap-[0.7rem]  ' >
            {brandsList?.map((item,index)=>{
                return(
                    <img key={index} src={item.name} alt="index" className=' w-[7rem] max-h-[4rem] h-auto object-contain border border-[#D71313] rounded-md ' />
                )
            })}
        </section>

    </div>
  )
}

export default Brands