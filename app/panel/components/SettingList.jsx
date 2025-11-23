"use client";
import React, { useEffect, useState } from "react";
import usetokenStore from "../store/tokenStore";
import Header from "./Header";
import Loading from "./Loading";
import Rightbar from "./Rightbar";
import Link from "next/link";
import Swal from "sweetalert2";

const SettingList = () => {
  const [loading, setloading] = useState(false);
  const [SettingList, setSettingList] = useState([]);
  const token = usetokenStore((state) => state.Melotoken);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;

  const getSettingList = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/settings/index`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-Domain-Hash":xdomainhash,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        console.log(data);
        setSettingList(data.data);
      }
      setloading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
      });
      //   alert(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getSettingList();
  }, []);
  
const deleteRow=async(id)=>{
  setloading(true)
  try {
    const response = await fetch(`${BASE_URL}/api/settings/destroy/${id}`, 
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-Domain-Hash":xdomainhash,
          },
        });
         if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data= await response.json();
        console.log(data);
          if (data.status) {
                    Swal.fire({
                      icon: "success",
                      title: data.message,
                    });
                    getSettingList()
                  }

      }
      setloading(false)
  } catch (error) {
     Swal.fire({
        icon: "error",
        title: error,
      });
      //   alert(error);
      setloading(false);
  }
}
  return (
    <main className=" w-full relative flex flex-col text-zinc-500  gap-[1rem] h-auto min-h-[100vh] bg-[#E5E5E5] ">
      <Header />
      <Loading loading={loading} />
      <section className=" w-full h-auto flex flex-row justify-between min-h-[80vh] ">
        <div className=" max-sm:hidden">
          <Rightbar />
        </div>
        <div className=" min-h-[100vh] h-auto w-[75vw] pl-[2rem] pb-[10rem]   flex flex-col  ">
          <h1 className=" text-zinc-700 font-semibold text-[16px] ">
            لیست تنظیمات
          </h1>
          <section className="bg-white min-h-[100vh] h-auto w-full mt-[2rem] rounded-[10px] pt-[2rem]   ">
            <Link
              className=" bg-green-400 text-white w-[7rem] h-[5rem] p-5 rounded-[10px] mr-[2rem] "
              href={`/panel/setting/create`}
            >
              + ایجاد تنظیمات جدید
            </Link>
            {/* <Link className=" bg-red-300 mr-3 " href={`edit/22`}>
              ویرایش
            </Link> */}
            <div className="overflow-x-auto px-[2rem] w-full self-center place-content-center place-items-center flex mt-[2rem] ">
              <table className="table colortable self-center  border border-gray-300 rounded-[10px]  ">
                {/* head */}
                <thead>
                  <tr className=" divide-x divide-gray-300 border-b border-b-gray-200 text-zinc-500 text-[14px] font-semibold ">
                    <th>id</th>
                    <th>کلید</th>
                    <th>محتوا</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {SettingList?.map((item, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          className=" divide-x divide-gray-300 hover:bg-gray-100"
                        >
                          <th className=" border border-gray-300">{item.id}</th>
                          <td className=" border border-gray-300 text-zinc-700 font-bold ">
                            {item.key}{" "}
                          </td>
                          <td className="border border-gray-300 text-zinc-800 text-[14px] font-bold ">
                            {item.type === "image" ? (
                              <img
                                src={item.value.fa}
                                alt="preview"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : item.type === "text" ? (
                              <h3 className=" text-zinc-700 font-semibold text-[16px]  " >{item.value.fa}</h3>
                            ) : item.type === "video" ? (
                              <video
                                src={item.value.fa}
                                controls
                                className="w-full h-full object-contain rounded"
                              />
                            ) : (
                              ""
                            )}
                          </td>

                          <td className=" border border-gray-300">
                            <Link href={`setting/edit/${item.id}`} className=" border border-gray-300 btn btn-primary">
                              ویرایش
                            </Link>
                          </td>
                          <td className=" border border-gray-300">
                            <button onClick={()=> deleteRow(item.id)} className=" border border-gray-300 btn btn-secondary">
                              حذف
                            </button>
                          </td>
                        </tr>
                        {/* {item.childs.length !== 0 && (
                        <>
                        {item.childs?.map((chitem,chindex)=>{
                          return(
                        <tr key={chindex} className=" divide-x divide-gray-300 hover:bg-gray-100">
                        <th className=" border border-gray-300">{item.id+"-"+chitem.id}</th>
                        <td className=" border border-gray-300" > {item.title.fa} </td>
                        <td className="border border-gray-300 text-zinc-500 text-[14px] font-medium ">
                          {chitem.title.fa}{" "}
                        </td>
                        <td className=" border border-gray-300" >
                          تصویر
                        </td>
                        <td className=" border border-gray-300" >
                          <button className=" border border-gray-300 btn btn-primary">ویرایش</button>
                        </td>
                        <td className=" border border-gray-300">
                          <button className=" border border-gray-300 btn btn-secondary">حذف</button>
                        </td>
                      </tr>
                          )
                        })}
                        </>
                      )} */}
                      </>
                    );
                  })}
                  {/* row  */}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default SettingList;
