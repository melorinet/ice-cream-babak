import React from "react";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import Topbanner from "../components/Topbanner";
import Categories from "../components/Categories";
import Brands from "../components/Brands";
import NewProducts from "../components/NewProducts";
import MostSell from "../components/MostSell";
import MainBtn from "../components/MainBtn";
import Offs from "../components/Offs";
import BottomNav from "../components/BottomNav";

const page = () => {
  return (
    <div className="  bg-[#FFFCFB] h-auto min-h-[280vh] flex flex-col  ">
      <Header />
      {/* <Searchbar /> */}
      <Topbanner />
      <Categories />
      <Brands />
      <NewProducts />
      <MostSell />
     <Offs />
     <BottomNav />
     {/* <MainBtn /> */}
    </div>
  );
};

export default page;
