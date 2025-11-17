"use client"
import Link from 'next/link'
import React,{useState} from 'react'
import Swal from "sweetalert2";
import Loading from "../components/Loading"
import useuidStore from "../store/uidStore"
import usephoneNumStore from "../store/phoneNumStore"
import useuserNameStore from "../store/userNameStore"
import usetokenStore from "../store/tokenStore"
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter()
    const [phoneNum, setphoneNum] = useState("")
    const [code, setcode] = useState("")
    const [uidstate, setuidstate] = useState("")
    const [phonestate, setphonestate] = useState()
    const [showCodeSection, setshowCodeSection] = useState(false)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;
    const addUid = useuidStore((state) => state.addUId);
  const addPhoneNum = usephoneNumStore((state) => state.addPhoneNum);
  const addUserName = useuserNameStore((state) => state.addUserName);
  const addToken = usetokenStore((state) => state.addToken);
  const uid = useuidStore((state) => state.Uid);
  const mobile = usephoneNumStore((state) => state.phoneNum);
  const token= usetokenStore((state)=>state.token)

  const [loading, setloading] = useState(false)
   const convertToEnglishNumerals = (phoneNum) => {
    const persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    const arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];

    let convertedPhoneNum = phoneNum;

    // Replace Persian numerals
    for (let i = 0; i < 10; i++) {
      convertedPhoneNum = convertedPhoneNum.replace(persianNumbers[i], i);
    }

    // Replace Arabic numerals
    for (let i = 0; i < 10; i++) {
      convertedPhoneNum = convertedPhoneNum.replace(arabicNumbers[i], i);
    }

    return convertedPhoneNum;
  };
  const sendPhoneToAPI=async()=>{
    setloading(true);
    const englishPhoneNum = convertToEnglishNumerals(phoneNum);
    try {
    const response= await fetch(`${BASE_URL}/api/mobilelogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Domain-Hash":xdomainhash,
            
          },
          body: JSON.stringify({
            name: englishPhoneNum.toString(),
            mobile: englishPhoneNum,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else{
        const data = await response.json();
        console.log(data)
        if (!data.error) {
    
          Swal.fire({
            title: data.message,
            icon: "success",
            draggable: true,
          });
   
          addUid(data.data.uid);
          setuidstate(data.data.uid);
          addPhoneNum(data.data.mobile);
          setphonestate(data.data.mobile);
          addUserName(data.data.name);
         setshowCodeSection(true)
          setloading(false);
        
        }
        setloading(false);
      }
    } catch (error) {
           console.log(error)
      Swal.fire({
        icon: "error",
        title: error,
      });

    //   alert(error);
      setloading(false);
    
      }
  }

  const sendCodetoAPI=async()=>{
    setloading(true)
    try {
       const response = await fetch(
        // "https://api.meloseo.ir/api/otp-login/check-password",
        `${BASE_URL}/api/checkpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Domain-Hash":xdomainhash,
          },
          body: JSON.stringify({
            uid: uidstate,
            mobile: phonestate,
            password: code,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        if (!data.error) {
              Swal.fire({
            title: data.message,
            icon: "success",
            draggable: true,
          });
          addToken(data.data.token);
          router.push("/landing", { shallow: true });
        }
        setloading(false);
      }
    } catch (error) {
      console.log(error)
         Swal.fire({
        icon: "error",
        title: error,
      });
    //   alert(error);
      setloading(false);
    }
  }

  

  return (
    <div className=' w-full h-auto min-h-screen bg-[url(/login-bg.webp)] bg-cover bg-center bg-blend-color bg-[#D71313]/60 flex place-content-center place-items-center ' >
     <Loading loading={loading} />
       {!showCodeSection ? (
<section className=' w-[94%] h-64 backdrop-blur-md gap-4 bg-white/15 rounded-2xl px-[3%] flex flex-col place-content-center place-items-center ' >
             <input
            type="tel"
            placeholder="شماره تلفن خود را وارد کنید"
            value={phoneNum}
            onChange={(v) => setphoneNum(v.target.value)}
            className=" text-[#132440] focus:border-zinc-800 w-full h-[4rem] bg-[#FFFCFB] border border-[#D71313] rounded-[10px] px-[2rem] text-right "
          />
          <button onClick={()=> sendPhoneToAPI()} className='text-[#FFFCFB] text-[18px] font-semibold drop-shadow-sm drop-shadow-white flex place-content-center place-items-center bg-[#CD2C58] w-full h-[4rem] rounded-2xl ' >
            ارسال کد ورود 
          </button>
        </section>
       ):(
        <section className=' w-[94%] h-64 backdrop-blur-md gap-4 bg-white/15 rounded-2xl px-[3%] flex flex-col place-content-center place-items-center ' >
             <input
            type="tel"
            placeholder="کد ورود به برنامه را وارد کنید"
            value={code}
            onChange={(v) => setcode(v.target.value)}
            className=" text-[#132440] focus:border-zinc-800 w-full h-[4rem] bg-[#FFFCFB] border border-[#D71313] rounded-[10px] px-[2rem] text-right "
          />
          <button onClick={()=>sendCodetoAPI()} className='text-[#FFFCFB] text-[18px] font-semibold drop-shadow-sm drop-shadow-white flex place-content-center place-items-center bg-[#CD2C58] w-full h-[4rem] rounded-2xl ' >
            ورود به برنامه
          </button>
        </section>
       )} 
    </div>
  )
}

export default Login