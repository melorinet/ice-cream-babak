"use client";
import React, { useState, useEffect } from "react";
import Rightbar from "./Rightbar";
import Loading from "./Loading";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import usetokenStore from "../store/tokenStore";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const EditPosts = (props) => {
  const [loading, setloading] = useState(false);
  const [activeTab, setactiveTab] = useState("tab1");
  const [Language, setLanguage] = useState("");
  const [LanguageNA, setLanguageNA] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Bannerimage, setBannerimage] = useState(null);
  const [Bannerpreview, setBannerpreview] = useState(null);
  const [Title, setTitle] = useState("");
  const [fewDescData, setfewDescData] = useState("");
  const [TextData, setTextData] = useState("");
  const [completeDescData, setcompleteDescData] = useState("");
  const [cellPrice, setcellPrice] = useState("");
  const [oldPrice, setoldPrice] = useState("");
  const [brand, setbrand] = useState("");
  const [SeoTags, setSeoTags] = useState("");
  const [SeoDesc, setSeoDesc] = useState("");
  const [Status, setStatus] = useState("");
  const [Comments, setComments] = useState("");
  const [showAddVariant, setshowAddVariant] = useState(false);
  const [VType, setVType] = useState("");
  const [VTitle, setVTitle] = useState("");
  const [VsellPrice, setVsellPrice] = useState("");
  const [VoldPrice, setVoldPrice] = useState("");
  const [Type, setType] = useState("");
  const [motherCatData, setmotherCatData] = useState([]);
  const [MotherCat, setMotherCat] = useState("");
  const [Imageattachments, setImageattachments] = useState([]);
  const [videoAttachments, setvideoAttachments] = useState([]);
  const [pdfAttachments, setpdfAttachments] = useState([]);
  const [imageNA, setImageNA] = useState("");
  const [video, setVideo] = useState("");
  const [previewNA, setPreviewNA] = useState(null);
  const [VideoPreview, setVideoPreview] = useState(null);
  const [TitleNA, setTitleNA] = useState("");
  const [Word, setWord] = useState("");
  const [Pdf, setPdf] = useState("");
  const [relatedPosts, setrelatedPosts] = useState([]);
  const [RelType, setRelType] = useState('')
  const [RelatedPostList, setRelatedPostList] = useState([])
  const [relatedPost, setrelatedPost] = useState("")
  const [TitleNewClass, setTitleNewClass] = useState("")
  const [imageNewClass, setimageNewClass] = useState(null);
  const [previewNewClass, setpreviewNewClass] = useState(null)
  const RelTypeList=[
    {
      id:1,
      name:"رنگ",
      value:"1"
    },
    {
      id:2,
      name:"ترکیب",
      value:"2"
    }
  ]
  const VTypeList = [
    {
      id: 1,
      name: "سایز",
      value: "size",
    },
    {
      id: 2,
      name: "وزن",
      value: "weight",
    },
    {
      id: 3,
      name: "جنس",
      value: "material",
    },
    {
      id: 4,
      name: "طول",
      value: "length",
    },
  ];
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
  const handleFileChangeNewClass = (e) => {
    const file = e.target.files[0]; // get first file
    if (file) {
      setimageNewClass(file); // save file in state
      setpreviewNewClass(URL.createObjectURL(file)); // create preview URL
    }
  };
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
      value: "fa",
    },
  ];
  const StatusList = [
    {
      id: 1,
      name: "عدم انتشار",
      value: "0",
    },
    {
      id: 2,
      name: "انتشار",
      value: "1",
    },
  ];
  const CommentsList = [
    {
      id: 1,
      name: "غیرفعال",
      value: 0,
    },
    {
      id: 2,
      name: "فعال",
      value: 1,
    },
  ];
  const topTabs = [
    {
      id: 1,
      title: "اطلاعات کلی",
      active: "tab1",
    },
    {
      id: 2,
      title: "بخش بندی",
      active: "tab2",
    },
    // {
    //   id: 3,
    //   title: "تگ ها",
    //   active: "tab3",
    // },
    {
      id: 4,
      title: "فایل های پیوستی",
      active: "tab4",
    },
    {
      id: 5,
      title: "پست مرتبط",
      active: "tab5",
    },
  ];
  const token = usetokenStore((state) => state.Melotoken);
  const [VariantPosts, setVariantPosts] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;

  const getPreFilledData = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/posts/show/${props.id}`,
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
        setTitle(data.data.title.fa);
        setfewDescData(data.data.pretext.fa);
        setTextData(data.data.text.fa);
        setcompleteDescData(data.data.description.fa);
        setcellPrice(data.data.sell_price);
        setoldPrice(data.data.old_price);
        setbrand(data.data.brand.fa);
        setSeoTags(data.data.seo_tag.fa);
        setSeoDesc(data.data.seo_meta.fa);
        setStatus(data.data.status);
        setComments(data.data.comment);
        setVariantPosts(data.data.variant_posts);
        setType(data.data.type);
        // setattachments(data.data.attachments);
        const images = [];
        const videos = [];
        const pdfs = [];

        data.data.attachments.forEach((item) => {
          if (item.type === "image") images.push(item);
          if (item.type === "video") videos.push(item);
          if (item.type === "pdf") pdfs.push(item);
        });

        setImageattachments(images);
        setvideoAttachments(videos);
        setpdfAttachments(pdfs);
        console.log("hi");
        console.log(data.data.attachments);
        console.log(Imageattachments);
        console.log(videoAttachments);
        console.log(pdfAttachments);
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
    getPreFilledData();
  }, []);

  const getMotherCatData = async (tab) => {
    setactiveTab(tab);
    setloading(true);
    // console.log(props.type)
    // console.log(`https://newapi.satyarpg.ir/api/categories/index/${props.type}`)
    try {
      const response = await fetch(
        `${BASE_URL}/api/categories/index/${Type}`,
        {
          method: "POST",
          headers: {
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
        setloading(false);
        const data = await response.json();
        console.log(data.data);
        setmotherCatData(data.data);
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

  const deleteAttachment = async (id) => {
    setloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/posts/attachments/delete/${id}`,
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
          getPreFilledData();
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

  const handleFileChangeNA = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      console.log("Selected image:", file);
      setImageNA(file);
      setPreviewNA(URL.createObjectURL(file));
    } else if (file.type.startsWith("video/")) {
      console.log("Selected video:", file);
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    } else if (file.type === "application/pdf") {
      console.log("Selected PDF:", file);
      setPdf(file);
      // No image preview, but you can show filename or icon
    } else if (
      file.type === "application/msword" || // .doc
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
    ) {
      console.log("Selected Word file:", file);
      setWord(file);
      // same: maybe show file name
    } else {
      console.error("Unsupported file type:", file.type);
    }
  };

  const CreateNewAttachment = async () => {
    try {
      if (LanguageNA == "") {
        Swal.fire({
          icon: "info",
          title: " زبان را انتخاب کنید",
        });
      } else if (TitleNA == "") {
        Swal.fire({
          icon: "info",
          title: " عنوان را انتخاب کنید",
        });
      } else {
        setloading(true);
        const formData = new FormData();
        formData.append("language", LanguageNA);
        formData.append("title", TitleNA);
        if (imageNA) {
          formData.append("file", imageNA);
          console.log(imageNA);
        } else if (video) {
          formData.append("file", video);
        } else if (Word) {
          formData.append("file", Word);
          console.log(Word);
        } else if (Pdf) {
          formData.append("file", Pdf);
          console.log(Pdf);
        }
        const response = await fetch(
          `${BASE_URL}/api/posts/attachments/store/${props.id}`,
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
          console.log(data);
          if (data.status) {
            Swal.fire({
              icon: "success",
              title: data.message,
            });
          }
          setTitleNA("");
          setImageNA("");
          setPreviewNA("");
          setVideo("");
          setVideoPreview("");
          setWord("");
          setPdf("");
          setLanguageNA("");
          getPreFilledData();
        }
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: error,
      });
      //   alert(error);
    }
  };

  const CreateNewClass=async()=>{
    try {
      if(RelType == ""){
         Swal.fire({
          icon: "info",
          title: " نوع ارتباط را انتخاب کنید",
        });
      }
      if(relatedPost == ""){
         Swal.fire({
          icon: "info",
          title: "  پست مرتبط انتخاب کنید",
        });
      }
      if(TitleNewClass== ""){
         Swal.fire({
          icon: "info",
          title: " عنوان کلاس جدید را انتخاب کنید",
        });
      }
      else {
        setloading(true)
        const formData = new formData()
        formData.append("",RelType)
        formData.append("",relatedPost)
        formData.append("",imageNewClass)
        const response= await fetch(`${props.id}`,{
               method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            "X-Domain-Hash":xdomainhash,

            },
            body: formData,
        })
        if (!response.ok) {
          const errorData = await response.json();
          setloading(false);
          throw new Error(errorData.message || "خطایی رخ داد");
        } else {
          const data= await response.json()
          console.log(data)
           if (data.status) {
            Swal.fire({
              icon: "success",
              title: data.message,
            });
          }
          setRelType("");
          setrelatedPost("")
          setTitleNewClass("")
          setimageNewClass(null)
          setpreviewNewClass(null)
        }
        setloading(false)
      }
    } catch (error) {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: error,
      });
    }

  }

  return (
    <section className=" w-full h-auto  flex flex-row justify-between min-h-[80vh] ">
      <div className=" max-sm:hidden">
        <Rightbar />
      </div>
      <Loading loading={loading} />
      <div className=" min-h-[100vh] h-auto w-[75vw]  flex flex-col pl-[2rem]  ">
        <pre className=" text-zinc-700 font-semibold  ">ویرایش پست</pre>
        <div className=" flex flex-col w-full  py-[2rem] h-auto min-h-[100vh] bg-white px-[1.5rem] mt-[2rem]  pb-[10rem] rounded-[10px] ">
          {/* شروع تب ها  */}
          <section className=" w-full h-[5rem] border-b-0 border-b-gray-800  flex flex-row rounded-[5px] gap-[0.2rem]  ">
            {topTabs?.map((item, index) => {
              return (
                <section key={index}>
                  <button
                    onClick={() => {
                      if (item.active === "tab2") {
                        getMotherCatData(item.active);
                      } else {
                        setactiveTab(item.active);
                      }
                    }}
                    className={` h-full w-[7rem] text-[16px] hover:bg-violet-200 ${
                      activeTab === item.active
                        ? ` bg-violet-200 border-b-0 border `
                        : ` bg-white border-b`
                    } active:bg-blue-500 active:text-white border-gray-500 hover:cursor-pointer text-zinc-700 rounded-[5px]`}
                  >
                    {item.title}
                  </button>
                </section>
              );
            })}
          </section>
          {activeTab === "tab1" && (
            <div className=" bg-white mt-[3rem] grid grid-cols-2 gap-[1.5rem] align-middle self-center h-auto min-h-[70vh] w-full ">
              <div>
                <h3 className=" text-zinc-700 text-[16px] font-medium ">
                  زبان
                </h3>
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
              <div className="">
                <h3 className=" text-zinc-700 text-[16px] font-medium ">
                  عنوان
                </h3>
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
                <h3 className=" text-zinc-700 text-[16px] font-medium ">
                  وضعیت
                </h3>
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
                  نظرات
                </h3>
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
              <button
                onClick={() => SubmitForm()}
                className="btn col-span-2 mt-[7%] text-white btn-accent"
              >
                ذخیره
              </button>

              <section className={` h-auto flex flex-col w-full col-span-2 `}>
                <button
                  onClick={() => setshowAddVariant(!showAddVariant)}
                  className=" w-full flex flex-row justify-between place-content-center place-items-center hover:bg-blue-700 hover:cursor-pointer active:bg-blue-300 bg-blue-500 h-[3rem] rounded-[10px] p-[0.5rem] text-white text-[16px] "
                >
                  واریانت ها
                  {showAddVariant ? (
                    <FaMinus size={24} color="#fff" />
                  ) : (
                    <FaPlus size={24} color="#fff" />
                  )}
                </button>
                {showAddVariant && (
                  <div className=" w-full h-auto flex pb-[15rem]   ">
                    {VariantPosts?.map((vitem, vindex) => {
                      return (
                        <div
                          key={vindex}
                          className=" w-full h-[5rem] flex flex-row justify-between  px-[0.3rem] gap-[0.3rem] "
                        >
                          <img
                            src={vitem.image}
                            alt="Selected"
                            className="w-full h-full object-contain"
                          />
                          <div>
                            <h3 className=" text-zinc-700 text-[16px] font-medium ">
                              نوع
                            </h3>
                            <input
                              onChange={(e) => setVType(e.currentTarget.value)}
                              // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                              className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.338rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                              placeholder=""
                              type="text"
                              list="VType"
                              value={VType}
                            />
                            <datalist id="VType">
                              {VTypeList.map((item, index) => (
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
                          <div className="">
                            <h3 className=" text-zinc-700 text-[16px] font-medium ">
                              عنوان
                            </h3>
                            <input
                              type="text"
                              value={VTitle}
                              onChange={(e) => {
                                setVTitle(e.target.value);
                              }}
                              placeholder=""
                              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                            />
                          </div>
                          <div className="">
                            <h3 className=" text-zinc-700 text-[16px] font-medium ">
                              قیمت قدیم
                            </h3>
                            <input
                              type="text"
                              value={VoldPrice}
                              onChange={(e) => {
                                setVoldPrice(e.target.value);
                              }}
                              placeholder=""
                              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                            />
                          </div>
                          <div className="">
                            <h3 className=" text-zinc-700 text-[16px] font-medium ">
                              قیمت جدید
                            </h3>
                            <input
                              type="text"
                              value={VsellPrice}
                              onChange={(e) => {
                                setVsellPrice(e.target.value);
                              }}
                              placeholder=""
                              className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                            />
                          </div>
                          <button className=" w-[5rem] h-[5rem] bg-red-600 text-white ">
                            حذف
                          </button>
                        </div>
                      );
                    })}
                    <div className=" w-full h-[5rem] flex flex-row  justify-between px-[0.3rem] gap-[0.2rem] mt-[2rem]   ">
                      <div className="flex flex-col h-auto  w-[7rem] ">
                        {/* File input */}
                        <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
                          تصویر
                        </h3>
                        <div className=" flex flex-col gap-[2rem] w-full  ">
                          <input
                            type="file"
                            accept="image/*"
                            placeholder={Bannerimage?.name}
                            onChange={(e) => handleBannerFileChange(e)}
                            className="border h-[2.5rem] mt-[0.930rem] rounded file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 file:cursor-pointer
                                     hover:file:bg-blue-700"
                          />

                          {/* Show preview if available */}
                          {Bannerpreview ? (
                            <div className="w-40 h-40 relative border rounded self-center ">
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
                              <MdOutlineImageNotSupported
                                color="#5d5d5d"
                                size={28}
                              />
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
                        <h3 className=" text-zinc-700 text-[16px] font-medium ">
                          نوع
                        </h3>
                        <input
                          onChange={(e) => setVType(e.currentTarget.value)}
                          // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                          className=" w-full max-sm:w-full  mt-[0.938rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                          placeholder=""
                          type="text"
                          list="VType"
                          value={VType}
                        />
                        <datalist id="VType">
                          {VTypeList.map((item, index) => (
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
                      <div className="">
                        <h3 className=" text-zinc-700 text-[16px] font-medium ">
                          عنوان
                        </h3>
                        <input
                          type="text"
                          value={VTitle}
                          onChange={(e) => {
                            setVTitle(e.target.value);
                          }}
                          placeholder=""
                          className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                        />
                      </div>
                      <div className="">
                        <h3 className=" text-zinc-700 text-[16px] font-medium ">
                          قیمت قدیم
                        </h3>
                        <input
                          type="text"
                          value={VoldPrice}
                          onChange={(e) => {
                            setVoldPrice(e.target.value);
                          }}
                          placeholder=""
                          className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                        />
                      </div>
                      <div className="">
                        <h3 className=" text-zinc-700 text-[16px] font-medium ">
                          قیمت جدید
                        </h3>
                        <input
                          type="text"
                          value={VsellPrice}
                          onChange={(e) => {
                            setVsellPrice(e.target.value);
                          }}
                          placeholder=""
                          className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                        />
                      </div>
                      <button className=" w-[5rem] rounded-[10px] h-[5rem] bg-red-600 text-white ">
                        حذف
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === "tab2" && (
            <div className="   grid grid-cols-2 gap-[1rem] align-middle self-center h-auto min-h-[40vh] w-full p-[2rem] ">
              <div className=" col-span-2">
                <h3 className=" text-zinc-700 text-[16px] font-medium ">بخش</h3>
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
                  {motherCatData?.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      className="text-zinc-700"
                    >
                      {item.title.fa}
                    </option>
                  ))}
                </datalist>
              </div>
              <button className="btn col-span-2 mt-0 text-white btn-accent">
                ذخیره
              </button>
            </div>
          )}

          {activeTab === "tab4" && (
            <section className=" flex h-auto min-h-[200vh] flex-col pb-[10rem] py-[2rem] ">
              <h3 className=" text-zinc-700 font-bold text-[16px] ">تصاویر</h3>
              <div className="overflow-x-auto w-full self-center place-content-center place-items-center flex mt-[0.5rem] ">
                <table className="table colortable self-center  border border-gray-300 rounded-[10px]  ">
                  {/* head */}
                  <thead>
                    <tr className=" divide-x divide-gray-300 border-b border-b-gray-200 text-zinc-500 text-[14px] font-semibold ">
                      <th>id</th>
                      <th>عنوان</th>
                      <th>فایل</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Imageattachments?.map((item, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className=" divide-x divide-gray-300 hover:bg-gray-100"
                          >
                            <th className=" border border-gray-300">
                              {item.id}
                            </th>
                            <td className=" border border-gray-300">
                              {item.title.fa}
                            </td>

                            <td className=" border border-gray-300">
                              <img
                                src={item.url}
                                alt="preview"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            </td>
                            <td className=" border border-gray-300">
                              <button
                                onClick={() => deleteAttachment(item.id)}
                                className=" border border-gray-300 btn btn-secondary"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <h3 className=" text-zinc-700 font-bold text-[16px] mt-[3rem] ">
                ویدیو ها
              </h3>
              <div className="overflow-x-auto w-full self-center place-content-center place-items-center flex mt-[0.5rem] ">
                <table className="table colortable self-center  border border-gray-300 rounded-[10px]  ">
                  {/* head */}
                  <thead>
                    <tr className=" divide-x divide-gray-300 border-b border-b-gray-200 text-zinc-500 text-[14px] font-semibold ">
                      <th>id</th>
                      <th>عنوان</th>
                      <th>فایل</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoAttachments?.map((item, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className=" divide-x divide-gray-300 hover:bg-gray-100"
                          >
                            <th className=" border border-gray-300">
                              {item.id}
                            </th>
                            <td className=" border border-gray-300">
                              {item.title.fa}
                            </td>

                            <td className=" border border-gray-300">
                              <video
                                src={item.url}
                                controls
                                className="w-full h-full object-contain rounded"
                              />
                            </td>
                            <td className=" border border-gray-300">
                              <button
                                onClick={() => deleteAttachment(item.id)}
                                className=" border border-gray-300 btn btn-secondary"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <h3 className=" text-zinc-700 font-bold text-[16px] mt-[3rem] ">
                فایل های Pdf
              </h3>
              <div className="overflow-x-auto w-full self-center place-content-center place-items-center flex mt-[0.5rem] ">
                <table className="table colortable self-center  border border-gray-300 rounded-[10px]  ">
                  {/* head */}
                  <thead>
                    <tr className=" divide-x divide-gray-300 border-b border-b-gray-200 text-zinc-500 text-[14px] font-semibold ">
                      <th>id</th>
                      <th>عنوان</th>
                      <th>فایل</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfAttachments?.map((item, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className=" divide-x divide-gray-300 hover:bg-gray-100"
                          >
                            <th className=" border border-gray-300">
                              {item.id}
                            </th>
                            <td className=" border border-gray-300">
                              {item.title.fa}
                            </td>

                            <td className=" border border-gray-300">
                              <a
                                href={item.url}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-blue-400"
                              >
                                دانلود pdf
                              </a>
                            </td>
                            <td className=" border border-gray-300">
                              <button
                                onClick={() => deleteAttachment(item.id)}
                                className=" border border-gray-300 btn btn-secondary"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <hr className=" w-full text-zinc-500 mt-[3rem] " />
              {/* ایجاد اتچ جدید  */}
              <div className=" grid gap-[1.5rem] grid-cols-2 w-full h-[15rem]  mt-[3rem] pb-[15rem] ">
                <h3 className=" col-span-2 text-zinc-700 font-bold text-[16px] ">
                  افزودن فایل جدید
                </h3>
                <div>
                  <h3 className=" text-zinc-700 text-[16px] font-medium ">
                    زبان
                  </h3>
                  <input
                    onChange={(e) => setLanguageNA(e.currentTarget.value)}
                    // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                    className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.938rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                    placeholder=""
                    type="text"
                    list="langList"
                    value={LanguageNA}
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
                <div className="">
                  <h3 className=" text-zinc-700 text-[16px] font-medium ">
                    عنوان
                  </h3>
                  <input
                    type="text"
                    value={TitleNA}
                    onChange={(e) => {
                      setTitleNA(e.target.value);
                    }}
                    placeholder=""
                    className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                  />
                </div>
                <div className="flex flex-col col-span-2 h-auto  w-full">
                  {/* File input */}
                  <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
                    تصویر ، ویدیو یا فایل
                  </h3>
                  <div className=" flex flex-row  gap-[2rem] w-full  ">
                    <input
                      type="file"
                      accept="image/*,video/*,.pdf"
                      placeholder={imageNA?.name || video?.name}
                      onChange={(e) => handleFileChangeNA(e)}
                      className="border h-[2.5rem] rounded 
                             file:bg-blue-600 file:text-white 
                             file:px-4 file:py-2 file:rounded 
                             file:border-0 file:cursor-pointer 
                             hover:file:bg-blue-700"
                    />

                    {/* Show preview if available */}
                    {previewNA ? (
                      <div className="w-48 h-48 relative border rounded self-center ">
                        <button
                          onClick={() => {
                            setImageNA("");
                            setPreviewNA("");
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
                          src={previewNA}
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
                <button
                  onClick={() => CreateNewAttachment()}
                  className="btn mt-[7%] col-span-2 text-white btn-accent"
                >
                  ذخیره
                </button>
              </div>
            </section>
          )}
          {activeTab === "tab5" && (
            <section className=" flex h-auto min-h-[200vh] flex-col pb-[10rem] py-[2rem] ">
              <h3 className=" text-zinc-700 font-bold text-[16px] ">
                پست های مرتبط
              </h3>
              <div className="overflow-x-auto w-full self-center place-content-center place-items-center flex mt-[0.5rem] ">
                <table className="table colortable self-center  border border-gray-300 rounded-[10px]  ">
                  {/* head */}
                  <thead>
                    <tr className=" divide-x divide-gray-300 border-b border-b-gray-200 text-zinc-500 text-[14px] font-semibold ">
                      <th>id</th>
                      <th>نوع ارتباط</th>
                      <th>عنوان پست</th>
                      <th>تصویر</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedPosts?.map((item, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className=" divide-x divide-gray-300 hover:bg-gray-100"
                          >
                            <th className=" border border-gray-300">
                              {item.id}
                            </th>
                            <td className=" border border-gray-300">
                              {item.title.fa}
                            </td>

                            <td className=" border border-gray-300">
                              <img
                                src={item.url}
                                alt="preview"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            </td>
                            <td className=" border border-gray-300">
                              <button
                                onClick={() => deleteAttachment(item.id)}
                                className=" border border-gray-300 btn btn-secondary"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <hr className=" w-full text-zinc-500 mt-[3rem] " />
              {/* ایجاد کلاس جدید */}
              <div className=" grid gap-[1.5rem] grid-cols-2 w-full h-[15rem]  mt-[3rem] pb-[15rem] ">
                <h3 className=" col-span-2 text-zinc-700 font-bold text-[16px] ">
                    ایجاد ارتباط جدید
                </h3>
                <div>
                  <h3 className=" text-zinc-700 text-[16px] font-medium ">
                    نوع ارتباط
                  </h3>
                  <input
                    onChange={(e) => setRelType(e.currentTarget.value)}
                    // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                    className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.938rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                    placeholder=""
                    type="text"
                    list="relType"
                    value={RelType}
                  />
                  <datalist id="relType">
                    {RelTypeList.map((item, index) => (
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
                     پست مرتبط
                  </h3>
                  <input
                    onChange={(e) => setrelatedPost(e.currentTarget.value)}
                    // className={`bg-[#dcfefd] rounded-[50px] h-[44px] px-[10px] placeholder:font-bold placeholder:text-[18px] mt-4`}
                    className=" w-full max-sm:w-full max-sm:mb-[5%] mt-[0.938rem] text-zinc-700 text-right h-[2.625rem] max-sm:h-[100%]  bg-[#F9F9F9] border-[1px] border-[#DEDDDD] rounded-[10px] px-[1.875rem] "
                    placeholder=""
                    type="text"
                    list="relatedPost"
                    value={relatedPost}
                  />
                  <datalist id="relatedPost">
                    {RelatedPostList?.map((item, index) => (
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
                <div className="">
                  <h3 className=" text-zinc-700 text-[16px] font-medium ">
                    عنوان
                  </h3>
                  <input
                    type="text"
                    value={TitleNewClass}
                    onChange={(e) => {
                      setTitleNewClass(e.target.value);
                    }}
                    placeholder=""
                    className=" bg-[#F9F9F9] mt-[0.938rem] w-full text-[#ACACAC] text-right px-[2%] h-[2.625rem] rounded-[10px] border-[1px] border-[#DEDDDD] "
                  />
                </div>
                <div className="flex flex-col col-span-2 h-auto  w-full">
                  {/* File input */}
                  <h3 className=" text-zinc-700 text-[16px] font-medium mb-1 ">
                    تصویر
                  </h3>
                  <div className=" flex flex-row  gap-[2rem] w-full  ">
                    <input
                      type="file"
                      accept="image/*"
                      placeholder={imageNewClass?.name}
                      onChange={(e) => handleFileChangeNewClass(e)}
                      className="border h-[2.5rem] rounded 
                             file:bg-blue-600 file:text-white 
                             file:px-4 file:py-2 file:rounded 
                             file:border-0 file:cursor-pointer 
                             hover:file:bg-blue-700"
                    />

                    {/* Show preview if available */}
                    {previewNewClass ? (
                      <div className="w-48 h-48 relative border rounded self-center ">
                        <button
                          onClick={() => {
                            setimageNewClass("");
                            setpreviewNewClass("");
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
                          src={previewNewClass}
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
                <button
                  onClick={() => CreateNewClass()}
                  className="btn mt-[7%] col-span-2 text-white btn-accent"
                >
                  ذخیره
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditPosts;
