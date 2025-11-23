"use client";
import React, { useState } from "react";
import Rightbar from "./Rightbar";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Loading from "./Loading";
import usetokenStore from "../store/tokenStore";
import Swal from "sweetalert2";

const CreateCategory = (props) => {
  const [Language, setLanguage] = useState("");
  const [MotherCat, setMotherCat] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Bannerimage, setBannerimage] = useState(null);
  const [Bannerpreview, setBannerpreview] = useState(null);
  const [catTitle, setcatTitle] = useState("");
  const [description, setdescription] = useState("")
  const [Status, setStatus] = useState("");
  const [SeoTags, setSeoTags] = useState("")
  const [SeoDesc, setSeoDesc] = useState("")
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // get first file
    if (file) {
      setImage(file); // save file in state
      setPreview(URL.createObjectURL(file)); // create preview URL
    }
  };
  const handleBannerFileChange = (e) => {
    const file = e.target.files[0]; // get first file
    if (file) {
      setBannerimage(file); // save file in state
      setBannerpreview(URL.createObjectURL(file)); // create preview URL
    }
  };
  const LanguageList = [
    {
      id: 1,
      name: "فارسی",
      value:"fa"
    },
  ];
  const motherCatList = [
    {
      id: 1,
      name: "پرنت",
      value:"0"
    },
    {
      id: 2,
      name: "زیرپرنت-",
      value:"1"
    },
  ];
  const StatusList = [
    {
      id: 1,
      name: "عدم انتشار",
      value:"0"
    },
    {
      id: 2,
      name: "انتشار",
      value:"1"
    },
  ];
 const [loading, setloading] = useState(false);
  const token = usetokenStore((state) => state.Melotoken);
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;
   const SubmitForm = async () => {

   
      try {
        if(Language == ""){Swal.fire({
              icon: "info",
              title:"زبان مورد نظر را انتخاب کنید",
            });
           }
        // else if(image === null){Swal.fire({
        //       icon: "info",
        //       title: " تصویر را انتخاب کنید"
        //     });}
        // else if(Bannerimage === null){Swal.fire({
        //       icon: "info",
        //       title:"تصویر  را انتخاب کنید",
        //     });}
        else if(catTitle == ""){Swal.fire({
              icon: "info",
              title:" عنوان بخش را انتخاب کنید",
            });}
        else if(Status == ""){Swal.fire({
              icon: "info",
              title:"وضعیت را انتخاب کنید",
            });}
        else if(description == ""){Swal.fire({
              icon: "info",
              title:"توضیحات خالی است",
            });}
        else if(SeoTags == ""){Swal.fire({
              icon: "info",
              title:"تگ های سئو خالی است",
            });}
        else if(SeoDesc == ""){Swal.fire({
              icon: "info",
              title:" توضیحات سئو خالی است",
            });}
            else{
                 setloading(true);
        const formData = new FormData();
        formData.append("type", props.type);
        formData.append("title",catTitle)
        formData.append("language", Language);
        formData.append("parent_id", "0");
        formData.append("description", description);
        formData.append("seo_tag", SeoTags);
        formData.append("seo_meta", SeoDesc);
        formData.append("status", Status);
        formData.append("image", image);
        formData.append("hero_image", Bannerimage);
        const response = await fetch(
          `${BASE_URL}/api/categories/store`,
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
      }} catch (error) {
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
      {/* بخش داخلی  */}
      <div className=" min-h-[50vh] h-auto w-[75vw]  flex flex-col  ">
          <pre className=" text-zinc-700 font-semibold  " >
          
          ایجاد بخش {props.type} جدید
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
                <option key={index} value={item.value} className="text-zinc-700">
                  {item.name}
                </option>
              ))}
            </datalist>
          </div>
{/* 
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              بخش مادر
            </h3>
            <input
              onChange={(e) => {setMotherCat(e.currentTarget.value);console.log(e.currentTarget.value)}}
              // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
              className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
              placeholder=""
              type="text"
              list="mothercat"
              value={MotherCat}
            />
            <datalist id="mothercat">
              {motherCatList.map((item, index) => (
                <option key={index} value={item.value} className="text-zinc-700">
                  {item.name}
                </option>
              ))}
            </datalist>
          </div> */}
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
                   <button onClick={()=> {setImage(null);setPreview(null)}} className=" w-[3rem] absolute -top-[1rem] -right-[1rem]  h-[3rem] place-items-center place-content-center " > <IoMdCloseCircle size={24} color="#ff0000" className="bg-white rounded-full " /> </button> 
                  <img
                    src={preview}
                    alt="Selected"
                    className="w-full h-full object-contain"
                  />
                </div>
              ):
              (
                <div className="w-36 h-36 relative border rounded  self-center flex place-content-center place-items-center "><MdOutlineImageNotSupported color="#5d5d5d" size={28} /></div>
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
           <div className="flex flex-col h-auto  w-full">
            {/* File input */}
            <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
              تصویر 
            </h3>
            <div className=" flex flex-row gap-[2rem] w-full  ">
              <input
                type="file"
                accept="image/*"
                placeholder={Bannerimage?.name}
                onChange={(e) => handleBannerFileChange(e)}
                className="border h-[2.5rem] rounded file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 file:cursor-pointer
             hover:file:bg-blue-700"
              />

              {/* Show preview if available */}
              {Bannerpreview ? (
                <div className="w-48 h-48 relative border rounded self-center ">
                   <button onClick={()=> {setBannerimage(null);setBannerpreview(null)}} className=" w-[3rem] absolute -top-[1rem] -right-[1rem]  h-[3rem] place-items-center place-content-center " > <IoMdCloseCircle size={24} color="#ff0000" className="bg-white rounded-full " /> </button> 
                  <img
                    src={Bannerpreview}
                    alt="Selected"
                    className="w-full h-full object-contain"
                  />
                </div>
              ):
              (
                            (
                <div className="w-36 h-36 relative border rounded  self-center flex place-content-center place-items-center "><MdOutlineImageNotSupported color="#5d5d5d" size={28} /></div>
              )
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
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              عنوان بخش
            </h3>
            <input
              type="text"
              value={catTitle}
              onChange={(e) => {
                setcatTitle(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">توضیحات</h3>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[4.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              تگ های سئو
            </h3>
            <input
              type="text"
              value={SeoTags}
              onChange={(e) => {
                setSeoTags(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              توضیحات سئو
            </h3>
            <input
              type="text"
              value={SeoDesc}
              onChange={(e) => {
                setSeoDesc(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[4.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">وضعیت</h3>
            <input
              onChange={(e) => setStatus(e.currentTarget.value)}
              // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
              className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
              placeholder={StatusList[0].name}
              type="text"
              list="status"
              value={Status}
            />
            <datalist id="status">
              {StatusList.map((item, index) => (
                <option key={index} value={item.value} className="text-zinc-700">
                  {item.name}
                </option>
              ))}
            </datalist>
          </div>
        </section>
     
      {/* <Link href={`create/${position}`} >{position}
    ایجاد منوی پوزیشن
     </Link><br />
     <Link href={`edit/22`} >
        ویرایش
     </Link> */}
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

export default CreateCategory;
