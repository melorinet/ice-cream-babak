"use client";
import React, { useState, useEffect } from "react";
import Rightbar from "./Rightbar";
import usetokenStore from "../store/tokenStore";
import Swal from "sweetalert2";
import Loading from "./Loading";

const CreateMenu = (props) => {
  const [Language, setLanguage] = useState("");
  const [MotherMenu, setMotherMenu] = useState("");
  const [MenuTitle, setMenuTitle] = useState("");
  const [LinkType, setLinkType] = useState("");
  const [category, setcategory] = useState("");
  const [post, setpost] = useState("");
  const [link, setlink] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [postList, setpostList] = useState([]);
  const [MotherMenuList, setMotherMenuList] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;
  const getCatList = async () => {
    try {
      setloading(true);
      const response = await fetch(
        `${BASE_URL}/api/categorylist`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Domain-Hash":xdomainhash,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        setloading(false);
        const data = await response.json();
        console.log(data);
        setcategoryList(data);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };

  useEffect(() => {
    getCatList();
  }, []);
  const getMotherMenuList = async () => {
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
        console.log(data.data);
        setMotherMenuList([
          { id: 0, title: { fa: "منوی مادر" } },
          ...data.data,
        ]);
        setloading(false);
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
    getMotherMenuList();
  }, []);

  const getPostList = async (catid) => {
    try {
      setloading(true);
      const response = await fetch(
        `${BASE_URL}/api/posts/${catid}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Domain-Hash":xdomainhash,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        setloading(false);
        const data = await response.json();
        console.log(data);
        setpostList(data);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };

  const LanguageList = [
    {
      id: 1,
      name: "فارسی",
      value: "fa",
    },
  ];
  // const MotherMenuList = [
  //   {
  //     id: 1,
  //     name: "خدمات",
  //     value: "0",
  //   },
  //   {
  //     id: 2,
  //     name: "نمونه سایت ها",
  //     value: "1",
  //   },
  // ];
  const LinkTypeList = [
    {
      id: 1,
      name: "لینک داخلی",
      value: "0",
    },
    {
      id: 2,
      name: "لینک خارجی",
      value: "1",
    },
  ];

  const [loading, setloading] = useState(false);
  const token = usetokenStore((state) => state.Melotoken);

  const SubmitForm = async () => {
    try {
      if (Language == "") {
        Swal.fire({
          icon: "info",
          title: "زبان مورد نظر را انتخاب کنید",
        });
      } else if (MotherMenu == "") {
        Swal.fire({
          icon: "info",
          title: "منوی مادر را انتخاب کنید",
        });
      } else if (MenuTitle == "") {
        Swal.fire({
          icon: "info",
          title: "عنوان منو را انتخاب کنید",
        });
      } else if (LinkType == "") {
        Swal.fire({
          icon: "info",
          title: "نوع لینک را انتخاب کنید",
        });
      } else if (category == "") {
        Swal.fire({
          icon: "info",
          title: "بخش بندی را انتخاب کنید",
        });
    
      } else if (link == "") {
        Swal.fire({
          icon: "info",
          title: "لینک خالی است",
        });
      } else {
        setloading(true);
        console.log(MotherMenu)
        const formData = new FormData();
        formData.append("type", props.position);
        formData.append("language", Language);
        formData.append("parent_id", MotherMenu);
        formData.append("title", MenuTitle);
        formData.append("linktype", LinkType);
        formData.append("category", category);
        formData.append("post", post);
        formData.append("value", link);
        const response = await fetch(
          `${BASE_URL}/api/menus/store`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "X-Domain-Hash":xdomainhash,
            },
            body: formData,
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setloading(false);
          throw new Error(errorData.message || "خطایی رخ داد");
        } else {
          const data = await response.json();
          if (data.status) {
            Swal.fire({
              icon: "success",
              title: data.message,
            });
          }
          setloading(false);
        }
        setloading(false)
      }
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
    <section className=" w-full h-auto  flex flex-row justify-between min-h-[50vh]  ">
      <div className=" max-sm:hidden">
        <Rightbar />
      </div>
      <Loading loading={loading} />
      {/* بخش داخلی  */}
      <div className=" min-h-[50vh] h-auto w-[75vw] pl-[2rem]  flex flex-col  ">
        <pre className=" text-zinc-700 font-semibold  ">
          ایجاد منوی {props.position}
        </pre>
        <div className=" flex flex-col w-full  py-[2rem] h-auto min-h-[50vh] bg-white px-[1.5rem] mt-[2rem] rounded-[10px] ">
          <section className=" w-full grid grid-cols-2 gap-[1.5rem] align-middle self-center min-h-[50vh] h-auto   ">
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">زبان</h3>
              <input
                onChange={(e) => setLanguage(e.currentTarget.value)}
                // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                placeholder="زبان"
                type="text"
                list="langList"
                value={Language}
              />
              <datalist id="langList">
                {LanguageList.map((item, index) => (
                  <option
                    key={index}
                    value={item.value}
                    className="text-zinc-700"
                  >
                    {item.name}
                  </option>
                ))}
              </datalist>
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                منوی مادر
              </h3>
              <select
                onChange={(e) => setMotherMenu(e.currentTarget.value)}
                value={MotherMenu}
                className="w-full text-zinc-700 bg-[#F9F9F9] border border-[#DEDDDD] rounded-[10px] px-[1.875rem] h-[2.625rem]"
              >
                <option disabled value="">
                  منوی مادر را انتخاب کنید
                </option>
                {MotherMenuList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title.fa}
                  </option>
                ))}
              </select>
              {/* <input
                onChange={(e) => setMotherMenu(e.currentTarget.value)}
                // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                placeholder="منوی مادر"
                type="text"
                list="motherMenu"
                value={MotherMenu}
              />
              <datalist id="motherMenu">
                {MotherMenuList.map((item, index) => (
                  <option
                    key={index}
                    value={item.value}
                    className="text-zinc-700"
                  >
                    {item.name}
                  </option>
                ))}
              </datalist> */}
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                عنوان منو
              </h3>
              <input
                type="text"
                value={MenuTitle}
                onChange={(e) => {
                  setMenuTitle(e.target.value);
                }}
                placeholder="عنوان منو"
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                نوع لینک
              </h3>
              <input
                onChange={(e) => setLinkType(e.currentTarget.value)}
                // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                className=" w-full max-sm:w-full max-sm:mb-[5%] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] mt-[0.938rem] "
                placeholder="نوع لینک"
                type="text"
                list="LinkType"
                value={LinkType}
              />
              <datalist id="LinkType">
                {LinkTypeList.map((item, index) => (
                  <option
                    key={index}
                    value={item.value}
                    className="text-zinc-700"
                  >
                    {item.name}
                  </option>
                ))}
              </datalist>
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                بخش بندی
              </h3>
              <input
                onChange={(e) => {
                  setcategory(e.currentTarget.value);
                  getPostList(e.currentTarget.value);
                }}
                // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.938rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                placeholder="بخش بندی"
                type="text"
                list="category"
                value={category}
              />
              <datalist id="category">
                {categoryList?.map((item, index) => (
                  <option key={index} value={item.id} className="text-zinc-700">
                    {item.title.fa}
                  </option>
                ))}
              </datalist>
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">پست</h3>
              <input
                onChange={(e) => setpost(e.currentTarget.value)}
                // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.938rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                placeholder="پست"
                type="text"
                list="post"
                value={post}
              />
              <datalist id="post">
                {postList.map((item, index) => (
                  <option key={index} value={item.id} className="text-zinc-700">
                    {item.title.fa}
                  </option>
                ))}
              </datalist>
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">لینک</h3>
              <input
                type="text"
                value={link}
                onChange={(e) => {
                  setlink(e.target.value);
                }}
                placeholder="لینک"
                className=" bg-[#F9F9F9] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
          </section>
          <button
            onClick={() => SubmitForm()}
            className="btn mt-[7%] text-white btn-accent"
          >
            ذخیره
          </button>
        </div>
      </div>
      {/* <Link href={`create/${position}`} >{position}
    ایجاد منوی پوزیشن
     </Link><br />
     <Link href={`edit/22`} >
        ویرایش
     </Link> */}
    </section>
  );
};

export default CreateMenu;
