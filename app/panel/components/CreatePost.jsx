"use client";
import React, { useState ,useEffect} from "react";
import Rightbar from "./Rightbar";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineImageNotSupported } from "react-icons/md";
import dynamic from "next/dynamic";
import usetokenStore from "../store/tokenStore";
import Swal from "sweetalert2";
import Loading from "./Loading";

// Dynamically load CKEditor + ClassicEditor together, SSR disabled
const CKEditor = dynamic(
  async () => {
    const { CKEditor } = await import("@ckeditor/ckeditor5-react");
    const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
      .default;

    return function CKEditorWrapper(props) {
      return <CKEditor editor={ClassicEditor} {...props} />;
    };
  },
  { ssr: false }
);

const CreatePost = (props) => {
  const [Language, setLanguage] = useState("");
  const [MotherCat, setMotherCat] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Bannerimage, setBannerimage] = useState(null);
  const [Bannerpreview, setBannerpreview] = useState(null);
  const [Title, setTitle] = useState("");
  const [fewDescData, setfewDescData] = useState("");
  const [TextData, setTextData] = useState("");
  const [SeoTags, setSeoTags] = useState("");
  const [SeoDesc, setSeoDesc] = useState("");
  const [Status, setStatus] = useState("");
  const [Comments, setComments] = useState("")
  const [completeDescData, setcompleteDescData] = useState("")
  const [cellPrice, setcellPrice] = useState("")
  const [oldPrice, setoldPrice] = useState("")
  const [brand, setbrand] = useState("")
  // const [completeDescServiceData, setcompleteDescServiceData] = useState("")
  // const [ServiceCellPrice, setServiceCellPrice] = useState("")
  // const [ServiceoldPrice, setServiceoldPrice] = useState("")
  // const [Servicebrand, setServicebrand] = useState("")
  const [ServicePeriod, setServicePeriod] = useState("")
  const token = usetokenStore((state)=>state.Melotoken)
  const [loading, setloading] = useState(false)
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
  const [motherCat, setmotherCat] = useState([])
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;

  const getMotherCatData= async()=>{
    setloading(true)
    // console.log(props.type)
    // console.log(`https://newapi.satyarpg.ir/api/categories/index/${props.type}`)
    try {
      const response= await fetch(`${BASE_URL}/api/categories/index/${props.type}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "X-Domain-Hash":xdomainhash,
              }});
               if (!response.ok) {
            const errorData = await response.json();
            setloading(false);
            throw new Error(errorData.message || "خطایی رخ داد");
          } else {
            setloading(false)
            const data= await response.json();
            console.log(data)
            setmotherCat(data.data)
          }
          setloading(false)
    } catch (error) {
      setloading(false)
      Swal.fire({
            icon: "error",
            title: error,
          });
          
    }
  }

  useEffect(() => {
    if(token){
   getMotherCatData()

    }
  }, [token])
  
  // const motherCat = [
  //   {
  //     id: 1,
  //     name: "پرنت",
  //     value:"0"
  //   },
  //   {
  //     id: 2,
  //     name: "زیرپرنت-",
  //     value:"1"
  //   },
  // ];
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
  const CommentsList =[
    {
      id:1,
      name:"غیرفعال",
      value:0
    },
    {
      id:2,
      name:"فعال",
      value:1
    }
  ] 
   function toEnglishDigits(str) {
    return str.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
              .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  }

   const SubmitForm = async () => {

     
        try {
          if(Language == ""){Swal.fire({
                icon: "info",
                title:"زبان مورد نظر را انتخاب کنید",
              });
             }
          // else if(MotherCat == ""){Swal.fire({
          //       icon: "info",
          //       title:"بخش مادر را انتخاب کنید",
          //     })}
          // else if(image === null){Swal.fire({
          //       icon: "info",
          //       title: " تصویر را انتخاب کنید"
          //     });}
          // else if(Bannerimage === null){Swal.fire({
          //       icon: "info",
          //       title:"تصویر  را انتخاب کنید",
          //     });}
          else if(Title == ""){Swal.fire({
                icon: "info",
                title:" عنوان را انتخاب کنید",
              });}
              else if (fewDescData == ""){
                Swal.fire({
                icon: "info",
                title:"توضیحات کوتاه را پر کنید",
              });
              }
              else if (TextData == ""){
                Swal.fire({
                icon: "info",
                title:"توضیحات متن را پر کنید",
              });
              }
          else if(Status == ""){Swal.fire({
                icon: "info",
                title:"وضعیت را انتخاب کنید",
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
          // formData.append("title",Title)
          formData.append("language", Language);
          formData.append("parent_id", "0");
          formData.append("category_id", MotherCat);
          formData.append("title",Title)
          formData.append("pretext", fewDescData);
          formData.append("text", TextData);
          formData.append("description",completeDescData);
          formData.append("sell_price",cellPrice);
          formData.append("old_price",oldPrice);
          formData.append("period",ServicePeriod)
          formData.append("seo_tag",SeoTags);
          formData.append("seo_meta",SeoDesc);
          formData.append("status",Status);
          formData.append("comment",Comments);
          formData.append("brand",brand);
          formData.append("hero_image",image);
          formData.append("image",Bannerimage);

          const response = await fetch(
            `${BASE_URL}/api/posts/store`,
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
            console.log(data)
            if (data.status) {
              Swal.fire({
                icon: "success",
                title: data.message,
              });
            }
            setloading(false);
          }
          setloading(false)
        }} catch (error) {
          setloading(false)
          Swal.fire({
            icon: "error",
            title: error,
          });
          //   alert(error);
        
        }
      };
  return (
    <section className=" w-full h-auto  flex flex-row justify-between min-h-[80vh] ">
      <div className=" max-sm:hidden">
        <Rightbar />
      </div>
      <Loading loading={loading}/>
      {/* بخش داخلی  */}
      <div className=" min-h-[50vh] h-auto w-[75vw]  flex flex-col  ">
        <pre className=" text-zinc-700 font-semibold  " >
       ایجاد {props.type} جدید
           
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

          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              بخش بندی
            </h3>
            <input
              onChange={(e) => setMotherCat(e.currentTarget.value)}
              // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
              className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
              placeholder=""
              type="text"
              list="mothercat"
              value={MotherCat}
            />
            <datalist id="mothercat">
              {motherCat.map((item, index) => (
                <option key={index} value={item.id} className="text-zinc-700">
                  {item.title.fa}
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
                  <button
                    onClick={() => {
                      setBannerimage(null);
                      setBannerpreview(null);
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
                    src={Bannerpreview}
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
          <div className=" col-span-2">
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
          <div className=" col-span-2 ">
            <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
              توضیحات کوتاه
            </h3>
            <CKEditor
              config={{
                language: {
                  ui: "fa", // UI language (buttons, menus, etc.)
                  content: "fa", // Editing area language
                },
                contentsLangDirection: "rtl", // Force editor content to RTL
              }}
              data={fewDescData}
              onChange={(_, editor) => {
                const newData = editor.getData();
                setfewDescData(newData);
                console.log("Editor data:", newData);
              }}
            />
          </div>
          <div className=" col-span-2 ">
            <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
              متن
            </h3>
            <CKEditor
              config={{
                language: {
                  ui: "fa", // UI language (buttons, menus, etc.)
                  content: "fa", // Editing area language
                },
                contentsLangDirection: "rtl", // Force editor content to RTL
              }}
              data={TextData}
              onChange={(_, editor) => {
                const newData = editor.getData();
                setTextData(newData);
                console.log("Editor data:", newData);
              }}
            />
          </div>
            {props.type === "product" && (
            <>
            <div className=" col-span-2 ">
            <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
              توضیحات تکمیلی
            </h3>
            <CKEditor
              config={{
                language: {
                  ui: "fa", // UI language (buttons, menus, etc.)
                  content: "fa", // Editing area language
                },
                contentsLangDirection: "rtl", // Force editor content to RTL
              }}
              data={completeDescData}
              onChange={(_, editor) => {
                const newData = editor.getData();
                setcompleteDescData(newData);
                console.log("Editor data:", newData);
              }}
            />
          </div>
           <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              قیمت فروش
            </h3>
            <input
              type="text"
              value={cellPrice}
              onChange={(e) => {
                setcellPrice(toEnglishDigits(e.target.value));
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              قیمت قدیم
            </h3>
            <input
              type="text"
              value={oldPrice}
              onChange={(e) => {
                setoldPrice(toEnglishDigits(e.target.value));
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
           <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              برند
            </h3>
            <input
              type="text"
              value={brand}
              onChange={(e) => {
                setbrand(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          </>
          )}
          {props.type === "service" && (
            // مدت اعتبار 
                <>
            <div className=" col-span-2 ">
            <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
              توضیحات تکمیلی
            </h3>
            <CKEditor
              config={{
                language: {
                  ui: "fa", // UI language (buttons, menus, etc.)
                  content: "fa", // Editing area language
                },
                contentsLangDirection: "rtl", // Force editor content to RTL
              }}
              data={completeDescData}
              onChange={(_, editor) => {
                const newData = editor.getData();
                setcompleteDescData(newData);
                console.log("Editor data:", newData);
              }}
            />
          </div>
           <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              قیمت فروش
            </h3>
            <input
              type="text"
              value={cellPrice}
              onChange={(e) => {
                setcellPrice(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              قیمت قدیم
            </h3>
            <input
              type="text"
              value={oldPrice}
              onChange={(e) => {
                setoldPrice(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
           <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              برند
            </h3>
            <input
              type="text"
              value={brand}
              onChange={(e) => {
                setbrand(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
             <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">
              مدت اعتبار
            </h3>
            <input
              type="text"
              value={ServicePeriod}
              onChange={(e) => {
                setServicePeriod(e.target.value);
              }}
              placeholder=""
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
            />
          </div>
          </>
          )}
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
              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[4.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
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
          <div>
            <h3 className=" text-zinc-700 text-[16px] font-medium ">نظرات</h3>
            <input
              onChange={(e) => setComments(e.currentTarget.value)}
              // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
              className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
              placeholder={CommentsList[0].name}
              type="text"
              list="comments"
              value={Comments}
            />
            <datalist id="comments">
              {CommentsList.map((item, index) => (
                <option key={index} value={item.value} className="text-zinc-700">
                  {item.name}
                </option>
              ))}
            </datalist>
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

export default CreatePost;
