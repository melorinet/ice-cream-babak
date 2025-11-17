import React from 'react'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import ProductCard from '../../components/ProductCard'

const page = () => {
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

    const products = [
    {
      id: 1,
      src: "/ice-cream.png",
      name: "بستنی عروسکی ",
      price: "120000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 2,
      src: "/ice-cream.png",
      name: "بستنی شکلاتی",
      price: "120000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 3,
      src: "/ice-cream.png",
      name: "بستنی میوه ای",
      price: "150000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 4,
      src: "/ice-cream.png",
      name: "بستنی وانیلی",
      price: "180000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 5,
      src: "/ice-cream.png",
      name: "بستنی شکلات کارامل",
      price: "130000",
        oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
    {
      id: 6,
      src: "/ice-cream.png",
      name: "بستنی دبی چاکلت",
      price: "160000",
    },
  ];
  return (
    <div className=' flex flex-col w-full h-auto min-h-[150vh] bg-[#FFFCFB] ' >
        <Header />
        <section className=' flex flex-col gap-[3%] w-full h-auto pt-[5.5rem] ' >
            <h3 className=' text-[#132440] text-[24px] w-full text-center ' >برندها</h3>
            <div className=' carousel w-full flex flex-row gap-2 h-[4rem] py-[0.5rem] px-[3%] ' >
                {brandsList?.map((item,index)=>{
                    return(
                        <button key={index} className=' carousel-item h-full !w-[5rem] rounded-2xl border border-[#218EFF] place-content-center place-items-center ' >
                        <img src={item.name} className=' h-full object-contain rounded-2xl  '
                        />
                        </button>
                    )
                })}
            </div>
            <div className=' grid grid-cols-2 w-full h-auto gap-x-[1rem] gap-y-[1rem] place-items-center px-[3%] mt-[2rem] ' >
                {products?.map((item,index)=>{
          const tomanPrice = new Intl.NumberFormat("fa-IR").format(item.price);
                    return(
           <ProductCard id={item.id} key={index} src={item.src} tomanPrice={tomanPrice} name={item.name} price={item.price} oldprice={item.oldprice} desc={item.desc} text={item.text} />
       
                    )
                })}
            </div>
        </section>

        <BottomNav />
    </div>
  )
}

export default page