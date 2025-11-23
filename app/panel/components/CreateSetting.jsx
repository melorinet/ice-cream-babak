"use client";
import React, { useState, useEffect } from "react";
import Rightbar from "./Rightbar";
import Loading from "./Loading";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { FaStarOfLife } from "react-icons/fa";
import Swal from "sweetalert2";
import usetokenStore from "../store/tokenStore";

const CreateSetting = () => {
  const [loading, setloading] = useState(false);
  const [Language, setLanguage] = useState("");
  const [singleKey, setsingleKey] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("")
  const [preview, setPreview] = useState(null);
  const [VideoPreview, setVideoPreview] = useState(null)
  const [desc, setdesc] = useState("");
  const token = usetokenStore((state) => state.Melotoken);
  const LanguageList = [
    {
      id: 1,
      name: "فارسی",
      value: "fa",
    },
  ];
//     const handleFileChange = (e) => {
//     const file = e.target.files[0]; // get first file
//     if (file) {
//       setImage(file); // save file in state
//       setPreview(URL.createObjectURL(file)); // create preview URL
//     }
//   };
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type.startsWith("image/")) {
    console.log("Selected image:", file);
     setImage(file);
     setPreview(URL.createObjectURL(file));
  } else if (file.type.startsWith("video/")) {
    console.log("Selected video:", file);
     setVideo(file);
     setVideoPreview(URL.createObjectURL(file))
  } else {
    console.error("Unsupported file type");
  }
};
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;

  const SubmitForm = async () => {
    console.log(desc)
    try {
      if (Language == "") {
        Swal.fire({
          icon: "info",
          title: "زبان مورد نظر را انتخاب کنید",
        });
      } else if (singleKey == "") {
        Swal.fire({
          icon: "info",
          title: "کلید یکتا خالی است",
        });
      } else if (image == "" && desc == "") {
        Swal.fire({
          icon: "info",
          title: "یکی از موارد عکس یا توضیحات را پر کنید",
        });
      } else {
        setloading(true);
        const formData = new FormData();
        formData.append("language", Language);
        formData.append("key", singleKey);
        formData.append("value", desc);
        if(image == ""){
        formData.append("value_file",video)
        }else if(video == ""){
        formData.append("value_file", image);
        }
        const response = await fetch(
          `${BASE_URL}/api/settings/store`,
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
        <pre className=" text-zinc-700 font-semibold  ">ایجاد تنظیمات جدید</pre>
        <div className=" flex flex-col w-full  py-[2rem] h-auto min-h-[50vh] bg-white px-[1.5rem] mt-[2rem] rounded-[10px] ">
          <h3 className=" text-gray-500  font-light flex flex-row-reverse gap-1 w-full  place-items-center place-content-baseline ">
            لطفاً یا فیلد «توضیحات» را تکمیل نمایید و یا تصویر مورد نظر را
            بارگذاری کنید. امکان ثبت همزمان هر دو مورد وجود دارد
            <FaStarOfLife color="#ff5757" size={14} />
          </h3>
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
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                کلید یکتا
              </h3>
              <input
                type="text"
                value={singleKey}
                onChange={(e) => {
            
                  setsingleKey(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div>
              <h3 className=" text-zinc-700 text-[16px] font-medium ">
                توضیحات 
              </h3>
              <textarea
                type="text"
                value={desc}
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
                placeholder=""
                className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[5.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
              />
            </div>
            <div className="flex flex-col h-auto  w-full">
              {/* File input */}
              <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
              تصویر یا ویدیو
              </h3>
              <div className=" flex flex-col gap-[2rem] w-full  ">
             <input
  type="file"
  accept="image/*,video/*"
  placeholder={image?.name || video?.name}
  onChange={(e) => handleFileChange(e)}
  className="border h-[2.5rem] rounded 
             file:bg-blue-600 file:text-white 
             file:px-4 file:py-2 file:rounded 
             file:border-0 file:cursor-pointer 
             hover:file:bg-blue-700"
/>

                {/* Show preview if available */}
                {preview ? (
                  <div className="w-48 h-48 relative border rounded self-center ">
                    <button
                      onClick={() => {
                        setImage("");
                        setPreview("");
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
                {VideoPreview ? (
  <div className="w-48 h-48 relative border rounded self-center">
    <button
      onClick={() => {
         // revoke the object URL if you created one
    if (VideoPreview) URL.revokeObjectURL(VideoPreview);

        setVideo("");
        setVideoPreview("");
      }}
      className="w-[3rem] absolute -top-[1rem] -right-[1rem] h-[3rem] place-items-center place-content-center"
    >
      <IoMdCloseCircle
        size={24}
        color="#ff0000"
        className="bg-white rounded-full"
      />
    </button>

    <video
      src={VideoPreview}
      controls
      className="w-full h-full object-contain rounded"
    />
  </div>
) : (
  <div className="w-36 h-36 relative border rounded self-center flex place-content-center place-items-center">
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

export default CreateSetting;
