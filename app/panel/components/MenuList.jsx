"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Rightbar from "./Rightbar";
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2";
import usetokenStore from "../store/tokenStore";
import Loading from "./Loading";

const MenuList = (props) => {
  const [loading, setloading] = useState(false);
  const { token } = usetokenStore((state) => state.Melotoken);
  const [MenuList, setMenuList] = useState([]);
  const [subMenu1, setsubMenu1] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;

  const getMenuTableData = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/menus/index/${props.position}`,
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
        setMenuList(data.data);

        setloading(false);
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
  };
  useEffect(() => {
    getMenuTableData();
  }, []);
  const deleteRow = async (id) => {
    setloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/menus/destroy/${id}`,
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
        if (data.status) {
          Swal.fire({
            icon: "success",
            title: data.message,
          });
          getMenuTableData();
        }
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
  return (
    <main className=" w-full relative flex flex-col text-zinc-500  gap-[1rem] h-auto min-h-[100vh] bg-[#E5E5E5] ">
      <Header />
      <Loading loading={loading} />
      <section className=" w-full h-auto flex flex-row justify-between min-h-[80vh] ">
        <div className=" max-sm:hidden">
          <Rightbar />
        </div>
        {/* بخش داخلی  */}
        <div className=" min-h-[100vh] h-auto w-[75vw] pl-[2rem] pb-[10rem]   flex flex-col  ">
          <h1 className=" text-zinc-700 font-semibold text-[16px] ">
            لیست منو {props.position}{" "}
          </h1>
          <section className="bg-white min-h-[100vh] h-auto w-full mt-[2rem] rounded-[10px] pt-[2rem]   ">
            <Link
              className=" bg-blue-700 text-white w-[7rem] h-[5rem] p-5 text-[16px] rounded-[10px] mr-[2rem]  "
              href={`/panel/menu/create/${props.position}`}
            >
              + ایجاد منوی جدید {props.position}
            </Link>
            {/* <Link
              className=" bg-red-300 mr-3 w-[7rem] h-[5rem] "
              href={`edit/`}
            >
              ویرایش
            </Link> */}
            <div className="overflow-x-auto px-[2rem] w-full self-center place-content-center place-items-center flex mt-[2rem] ">
              <table className="table colortable self-center  border border-gray-300 rounded-[10px]  ">
                {/* head */}
                <thead>
                  <tr className=" divide-x divide-gray-300 border-b border-b-gray-200 text-zinc-500 text-[14px] font-semibold ">
                    <th>id</th>
                    <th>منوی مادر</th>
                    <th>عنوان</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {MenuList?.map((item, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          className=" divide-x divide-gray-300 hover:bg-gray-100"
                        >
                          <th className=" border border-gray-300">{item.id}</th>
                          <td className=" border border-gray-300">- </td>
                          <td className="border border-gray-300 text-zinc-800 text-[14px] font-bold ">
                            {item.title.fa}{" "}
                          </td>
                          <td className=" border border-gray-300">
                            <Link href={`edit/${item.id}`} className=" border border-gray-300 btn btn-primary">
                              ویرایش
                            </Link>
                          </td>
                          <td className=" border border-gray-300">
                            <button onClick={()=> deleteRow(item.id)} className=" border border-gray-300 btn btn-secondary">
                              حذف
                            </button>
                          </td>
                        </tr>
                        {item.childs.length !== 0 && (
                          <>
                            {item.childs?.map((chitem, chindex) => {
                              return (
                                <tr
                                  key={chindex}
                                  className=" divide-x divide-gray-300 hover:bg-gray-100"
                                >
                                  <th className=" border border-gray-300">
                                    {item.id + "-" + chitem.id}
                                  </th>
                                  <td className=" border border-gray-300">
                                    {" "}
                                    {item.title.fa}{" "}
                                  </td>
                                  <td className="border border-gray-300 text-zinc-500 text-[14px] font-medium ">
                                    {chitem.title.fa}{" "}
                                  </td>
                                  <td className=" border border-gray-300">
                                    <button className=" border border-gray-300 btn btn-primary">
                                      ویرایش
                                    </button>
                                  </td>
                                  <td className=" border border-gray-300">
                                    <button onClick={()=> deleteRow(chitem.id)} className=" border border-gray-300 btn btn-secondary">
                                      حذف
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        )}
                      </>
                    );
                  })}
                  {/* row  */}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {/* <Link href={`create/${position}`} >{position}
    ایجاد منوی پوزیشن
     </Link><br />
     <Link href={`edit/22`} >
        ویرایش
     </Link> */}
      </section>
      <Footer />
    </main>
  );
};

export default MenuList;
