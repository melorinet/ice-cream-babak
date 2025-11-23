"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import usephoneNumStore from "../store/phoneNumStore";
import useuserNameStore from "../store/userNameStore";
import useuidStore from "../store/uidStore";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import usetokenStore from "../store/tokenStore";
import Swal from "sweetalert2";


const Login = () => {
  const [showCodeField, setshowCodeField] = useState(false);
  const [phoneNum, setphoneNum] = useState("");
  const [loading, setloading] = useState(false);
  const [uidstate, setuidstate] = useState();
  const [phonestate, setphonestate] = useState();
  const addUid = useuidStore((state) => state.addUId);
  const addPhoneNum = usephoneNumStore((state) => state.addPhoneNum);
  const addUserName = useuserNameStore((state) => state.addUserName);
  const addToken = usetokenStore((state) => state.addToken);
  const uid = useuidStore((state) => state.MeloUid);
  const mobile = usephoneNumStore((state) => state.MelophoneNum);
  const token= usetokenStore((state)=>state.Melotoken)
useEffect(() => {
 if(token){
  setloading(true)
  router.push("/panel/dashboard",{shallow:true})
  setloading(false)
 }

}, [token])

  const [code, setcode] = useState("");
  const router = useRouter();
 
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;

  const sendPhoneToAPI = async () => {
    console.log(xdomainhash)
    setloading(true);
    //  const phoneNum= document.getElementById("phoneNum").value;
    const englishPhoneNum = convertToEnglishNumerals(phoneNum);
    try {
      const response = await fetch(
        // "https://api.meloseo.ir/api/otp-login/mobile-login",
        `${BASE_URL}/api/mobilelogin`,
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
      } else {
        const data = await response.json();

        if (!data.error) {
     
          Swal.fire({
            title: data.message,
            icon: "success",
            draggable: true,
          });
          //   alert(data.message);
   
          addUid(data.data.uid);
          setuidstate(data.data.uid);
          addPhoneNum(data.data.mobile);
          setphonestate(data.data.mobile);
          addUserName(data.data.name);
          setloading(false);
          setshowCodeField(true);
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
    // await fetch("https://api.meloseo.ir/api/otp-login/mobile-login",{
    //  "mobile":englishPhoneNum
    // }).then((response)=>{
    //     setloading(false);
    //     if(!response.data.error){
    //         addUid(response.data.data.uid);
    //         addPhoneNum(response.data.data.mobile);
    //         router.push("/pages/codeValidate",{ shallow: true });
    //     }else{
    //         resTxt.innerText=response.data.message
    //     }
    // }).catch((error)=>{
    //     setloading(false);
    //     resTxt.innerText=error;
    //     alert(error)
    // })
  };
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
  
  const validateCode = async () => {
  console.log(xdomainhash)
    setloading(true);
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
          router.push("/panel/dashboard", { shallow: true });
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
  };
  return (
    <div className=" w-full h-auto flex flex-row min-h-[100vh] bg-gray-50 bg-gradient-to-br from-gray-50 to-violet-100 place-items-center ">
      {showCodeField ? (
        <section className=" px-[2rem] flex flex-col gap-[2rem] py-[1rem] w-[27.625rem] h-[100vh] place-items-center place-content-center border border-zinc-400  ">
          <h3 className=" self-center text-[16px] font-semibold text-zinc-700 ">
            کد پیامک شده
          </h3>
          <input
            type="text"
            onChange={(e) => setcode(e.target.value)}
            value={code}
            placeholder="کد پیامک شده"
            className=" text-zinc-500 focus:border-zinc-800 w-full h-[3rem] bg-white border border-zinc-500 rounded-[10px] px-[2rem] text-right "
          />
          <button
            onClick={() => validateCode()}
            className="btn btn-primary w-full "
          >
            ورود به سیستم
          </button>
        </section>
      ) : (
        <section className=" px-[2rem] flex flex-col gap-[2rem] py-[1rem] w-[27.625rem] h-[100vh] border place-items-center place-content-center border-zinc-400  ">
          <h3 className=" self-center text-[16px] font-semibold text-zinc-700 ">
            ورود به سیستم
          </h3>
          <input
            type="tel"
            placeholder="شماره تلفن"
            value={phoneNum}
            onChange={(v) => setphoneNum(v.target.value)}
            className=" text-zinc-500 focus:border-zinc-800 w-full h-[3rem] bg-white border border-zinc-500 rounded-[10px] px-[2rem] text-right "
          />
          <button
            onClick={() => {
              sendPhoneToAPI();
            }}
            className="btn btn-primary w-full "
          >
            ارسال کد ورود به سیستم
          </button>
        </section>
      )}
      <Loading loading={loading} />
      <img
        src="/loginBg.webp"
        alt="loginbg"
        className=" max-sm:hidden w-[76vw] h-[100vh] object-cover "
      />
    </div>
  );
};

export default Login;
