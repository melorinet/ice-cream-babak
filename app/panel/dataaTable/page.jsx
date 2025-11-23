"use client"
import React,{useState,useEffect} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InnerComponents from "../components/InnerComponents";
import usetokenStore from "../store/tokenStore";
import { useRouter } from "next/navigation";


export default function Home() {
      const [activePage, setactivePage] = useState("dataTable");
    const changeActivePage=(pageName)=>{
        setactivePage(pageName)
    }
    const token= usetokenStore((state)=>state.Melotoken)
    const router=useRouter()
// useEffect(() => {
//  if(!token){
// router.push("/")
//  }
// }, [])

  return (
    <div className="flex flex-col h-auto w-full min-h-[100vh] bg-[#E5E5E5]  ">
      <Header  />
      <InnerComponents changeActivePage={changeActivePage} activePage={activePage} />
      <Footer /> 
    </div>
  );
}
