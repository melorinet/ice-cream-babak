"use client";
import React, { useState, useEffect } from "react";
import Rightbar from "./Rightbar";
import Loading from "./Loading";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Swal from "sweetalert2";
import usetokenStore from "../store/tokenStore";
import { IoMdCloseCircle } from "react-icons/io";


const CreateBanner = (props) => {
  const [loading, setloading] = useState(false);
  const [Language, setLanguage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Title, setTitle] = useState("");
  const [desc1, setdesc1] = useState("");
  const [desc2, setdesc2] = useState("");
  const [desc3, setdesc3] = useState("");
  const [desc4, setdesc4] = useState("");
  const [bannerLink, setbannerLink] = useState("");
  const [Linktext, setLinktext] = useState("");
  const [clickLimit, setclickLimit] = useState(99999999);
   const token = usetokenStore((state)=>state.Melotoken)
   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // get first file
    if (file) {
      setImage(file); // save file in state
      setPreview(URL.createObjectURL(file)); // create preview URL
    }
  };
  const LanguageList = [
    {
      id: 1,
      name: "فارسی",
      value: "fa",
    },
  ];

  const SubmitForm = async () => {
    try {
      if (Language == "") {
        Swal.fire({
          icon: "info",
          title: "زبان مورد نظر را انتخاب کنید",
        });
      } else if (Title == "") {
        Swal.fire({
          icon: "info",
          title: "عنوان خالی است",
        });
      } else if (bannerLink == "") {
        Swal.fire({
          icon: "info",
          title: "لینک بنر را پر کنید",
        });
      } else if (Linktext == "") {
        Swal.fire({
          icon: "info",
          title: "متن لینک را پر کنید",
        });
      } else {
        setloading(true);
        const formData = new FormData();
        formData.append("attachment", image);
        formData.append("type", props.type);
        formData.append("language", Language);
        formData.append("title", Title);
        formData.append("desc1", desc1);
        formData.append("desc2", desc2);
        formData.append("desc3", desc3);
        formData.append("desc4", desc4);
        formData.append("link", bannerLink);
        formData.append("linktext", Linktext);
        formData.append("clicklimit", clickLimit);
        const response = await fetch(
          `${BASE_URL}/api/banners/store`,
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
    <section className=" w-full h-auto  flex flex-row justify-between min-h-[80vh] ">
      <div className=" max-sm:hidden">
        <Rightbar />
      </div>
      <Loading loading={loading} />
      <div className=" min-h-[50vh] h-auto w-[75vw]  flex flex-col  ">
        <pre className=" text-zinc-700 font-semibold  ">
          ایجاد بنر {props.type} جدید
        </pre>
        <div className=" flex flex-col w-full  py-[2rem] h-auto min-h-[50vh] bg-white px-[1.5rem] mt-[2rem] rounded-[10px] ">
          <section className=" w-full ml-[2rem] py-[2rem] grid grid-cols-2 gap-[1.5rem] align-middle self-center bg-white min-h-[50vh] h-auto px-[1.5rem] rounded-[10px] mt-[2rem] ">
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">زبان</h3>
              <input
                onChange={(e) => setLanguage(e.currentTarget.value)}
                // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                placeholder=""
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
            <div className="flex flex-col h-auto  w-full">
              {/* File input */}
              <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
                تصویر بنر
              </h3>
              <div className=" flex flex-row gap-[2rem] w-full  ">
                <input
                  type="file"
                  accept="image/*"
                  placeholder={image?.name}
                  onChange={(e) => handleFileChange(e)}
                  className=" border h-[2.5rem] rounded file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 file:cursor-pointer
                         hover:file:bg-blue-700"
                />

                {/* Show preview if available */}
                {preview ? (
                  <div className="w-48 h-48 relative border rounded self-center ">
                    <button
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      className=" w-[3rem] absolute -top-[1rem] -right-[1rem]  h-[3rem] place-items-center place-content-center "
                    >
                      {" "}
                      <IoMdCloseCircle
                        size={24}
                        color="#ff0000"
                        className="bg-white rounded-full "
                      />{" "}
                    </button>
                    <img
                      src={preview}
                      alt="Selected"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-36 h-36 relative border rounded  self-center flex place-content-center place-items-center ">
                    <MdOutlineImageNotSupported color="#5d5d5d" size={28} />
                  </div>
                )}

                {/* Debug: show file name */}
                {/* {image && ( */}
                {/* <div className=" flex flex-row " > */}
                {/* <p className="text-sm text-gray-600 self-center ">عکس انتخاب شده: {image.name}</p> */}
                {/* </div> */}
                {/* )} */}
              </div>
              {/* ****** */}
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">عنوان</h3>
              <input
                type="text"
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                توضیحات اول
              </h3>
              <textarea
                type="text"
                value={desc1}
                onChange={(e) => {
                  setdesc1(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[5.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                توضیحات دوم
              </h3>
              <textarea
                type="text"
                value={desc2}
                onChange={(e) => {
                  setdesc2(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[5.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                توضیحات سوم
              </h3>
              <textarea
                type="text"
                value={desc3}
                onChange={(e) => {
                  setdesc3(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[5.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                توضیحات چهارم
              </h3>
              <textarea
                type="text"
                value={desc4}
                onChange={(e) => {
                  setdesc4(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[5.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                لینک بنر
              </h3>
              <input dir="ltr"
                type="text"
                value={bannerLink}
                onChange={(e) => {
                  setbannerLink(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                متن لینک
              </h3>
              <input
                type="text"
                value={Linktext}
                onChange={(e) => {
                  setLinktext(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                محدودیت کلیک
              </h3>
              <input
                type="text"
                value={clickLimit}
                onChange={(e) => {
                  setclickLimit(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
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
    </section>
  );
};

export default CreateBanner;
