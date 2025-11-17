import React from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import ProductCard from './ProductCard';

const MoreProducts = (props) => {
  const title=decodeURIComponent(props.title)
       const productsList = [
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
       oldprice:"130000",
      text:"pretext mahsul",
      desc:"توضیحات محصول"
    },
  ];
  return (
    <div className=' w-full h-auto min-h-screen flex flex-col bg-[#FFFCFB]  ' >
      <Header />
       <h3 className=' mt-[6rem] text-[#132440] text-[18px] self-center ' >{title}</h3>
      <section className=' grid grid-cols-2 w-full h-auto pb-[10rem] mt-[3%] px-[3%] place-items-center gap-2 ' >
        {productsList?.map((item,index)=>{
          const tomanPrice = new Intl.NumberFormat('fa-IR').format(item.price); 
          return(
           <ProductCard id={item.id} key={index} src={item.src} tomanPrice={tomanPrice} name={item.name} price={item.price} oldprice={item.oldprice} desc={item.desc} text={item.text} />
          )
        })}
      </section>
      <BottomNav />
    </div>
  )
}

export default MoreProducts