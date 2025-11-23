"use client";
import React, { useState, useEffect } from "react";
import useuidStore from "../store/uidStore";
import usetokenStore from "../store/tokenStore";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";

// avatar,
// birthday,
// city,
// email,
// gender,
// mobile,
// name,

const ProfileInfo = () => {
  const uid = useuidStore((state) => state.Uid);
  const token = usetokenStore((state) => state.token);

  const [loading, setloading] = useState(false);

  const [avatar, setavatar] = useState("");
  const [birthday, setbirthday] = useState("");
  const [city, setcity] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [mobile, setmobile] = useState("");
  const [name, setname] = useState("");

  const [showAddrForm, setshowAddrForm] = useState(false);
  const [showProfileForm, setshowProfileForm] = useState(true);
  const [showAddrLists, setshowAddrLists] = useState([]);

  const [AddressListArray, setAddressListArray] = useState([]);
  // const [state, setstate] = useState("");

  const [StatesList, setStatesList] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [addrType, setaddrType] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash = process.env.NEXT_PUBLIC_XDOMAINHASH;
  const getStatesList = async () => {
    setloading(true);
  await axios
  .get(`${BASE_URL}/api/statecity`, {
    params: {
      uid: uid,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-Domain-Hash": xdomainhash,
    },
  })
  .then((response) => {
    setloading(false);
    if (!response.data.error) {
      setStatesList(response.data);
    }
  })
  .catch((error) => {
    console.log(error);
    setloading(false);
  });

  };
  // const getStatesList = async () => {
  //   setloading(true);
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/statecity`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${token}`,
  //         "X-Domain-Hash": xdomainhash,
  //       },
  //       body: JSON.stringify({
  //         uid: uid,
  //       }),
  //     });
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setloading(false);
  //       throw new Error(errorData.message || "خطایی رخ داد");
  //     } else {
  //       const data = await response.json();
  //       if (!data.error) {
  //         setStatesList(data);
  //         setloading(false);
  //       }
  //     }
  //     setloading(false);
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: error,
  //     });

  //     //   alert(error);
  //     setloading(false);
  //   }
  // };
  // const getStatesList = async () => {
  //   setloading(true);
  //   await axios
  //     .get(
  //       "https://api.inparde.com/api/fa/statecity",
  //       {
  //         uid: uid,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setloading(false);
  //       if (!response.data.error) {
  //         setStatesList(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setloading(false);
  //     });
  // };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setCities(StatesList[state]);
    setSelectedCity(""); // Reset the city selection
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const getAddressInfo = async () => {
    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-Domain-Hash": xdomainhash,
        },
        body: JSON.stringify({
          uid: uid,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        setloading(false);
        if (data.length != 0 && !data.error) {
          setAddressListArray(data);
        } else {
          console.log(data.message);
          Swal.fire({
            icon: "error",
            title: data.message,
          });

          //   alert(error);
          setloading(false);
        }
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error,
      });

      //   alert(error);
      setloading(false);
    }
  };

  // const getAddressInfo = async () => {
  //   setloading(true);
  //   await axios
  //     .post(
  //       "https://api.inparde.com/api/fa/address",
  //       {
  //         uid: uid,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setloading(false);
  //       // console.log("addrr responsee");
  //       // console.log(response);
  //       // console.log(response.data.length);
  //       if (response.data.length != 0 && !response.data.error) {
  //         setAddressListArray(response.data);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setloading(false);
  //     });
  // };

  const getProfileInfo = async () => {
    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/loadprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-Domain-Hash": xdomainhash,
        },
        body: JSON.stringify({
          uid: uid,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        setloading(false);
        if (!data.error) {
          setavatar(data.data.avatar);
          setbirthday(data.data.birthday);
          setSelectedState(data.data.city);
          setemail(data.data.email);
          setgender(data.data.gender);
          setmobile(data.data.mobile);
          setname(data.data.name);
        } else {
          Swal.fire({
            icon: "error",
            title: data.message,
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error,
      });
      //   alert(error);
      setloading(false);
    }
  };
  // const getProfileInfo = async () => {
  //   setloading(true);
  //   await axios
  //     .post(
  //       "https://api.inparde.com/api/fa/loadprofile",
  //       {
  //         uid: uid,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setloading(false);
  //       // console.log("profile responsee");
  //       // console.log(response);
  //       // console.log(response.data);
  //       if (!response.data.error) {
  //         setavatar(response.data.data.avatar);
  //         setbirthday(response.data.data.birthday);
  //         setSelectedState(response.data.data.city);
  //         setemail(response.data.data.email);
  //         setgender(response.data.data.gender);
  //         setmobile(response.data.data.mobile);
  //         setname(response.data.data.name);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setloading(false);
  //     });
  // };
  useEffect(() => {
    getProfileInfo();
    getAddressInfo();
    getStatesList();
  }, []);

  const updateProfile = async (e) => {
    setloading(true);
    const userName = document.getElementById("userName").value;
    const date = document.getElementById("date").value;
    const aboutme = document.getElementById("aboutme").value;
    var mygender;
    if (document.getElementById("female").checked) {
      mygender = 0;
    } else if (document.getElementById("man").checked) {
      mygender = 1;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/updateprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-Domain-Hash": xdomainhash,
        },
        body: JSON.stringify({
          uid: uid,
          name: userName,
          phone: mobile,
          about: aboutme,
          gender: mygender,
          birthday: date,
          state: selectedState,
          city: selectedCity,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        setloading(false);
        if (!data.error) {
          getProfileInfo();
          Swal.fire({
            title: data.message,
            icon: "success",
            draggable: true,
          });
        }
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error,
      });
      //   alert(error);
      setloading(false);
    }
  };

  // const updateProfile = async (e) => {
  //   // e.preventDefault();
  //   setloading(true);
  //   const userName = document.getElementById("userName").value;
  //   const date = document.getElementById("date").value;
  //   const aboutme = document.getElementById("aboutme").value;
  //   var mygender;
  //   if (document.getElementById("female").checked) {
  //     mygender = 0;
  //   } else if (document.getElementById("man").checked) {
  //     mygender = 1;
  //   }

  //   await axios
  //     .post(
  //       "https://api.inparde.com/api/fa/updateprofile",
  //       {
  //         uid: uid,
  //         name: userName,
  //         phone: mobile,
  //         about: aboutme,
  //         gender: mygender,
  //         birthday: date,
  //         state: selectedState,
  //         city: selectedCity,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setloading(false);
  //       if (!response.data.error) {
  //         alert(response.data.message);
  //         getProfileInfo();
  //       } else {
  //         alert(response.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setloading(false);
  //     });
  // };

  const createAddress = async () => {
    setloading(true);
    const addrTitle = document.getElementById("addrType").value;
    const address = document.getElementById("address").value;
    const postalCode = document.getElementById("postalCode").value;
    try {
      const response = await fetch(`${BASE_URL}/api/address/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-Domain-Hash": xdomainhash,
        },
        body: JSON.stringify({
          uid: uid,
          title: addrTitle,
          state: selectedState,
          city: selectedCity,
          address: address,
          zipcode: postalCode,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        setloading(false);
        if (!data.error) {
          getAddressInfo();
        }
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error,
      });
      //   alert(error);
      setloading(false);
    }
  };
  // const createAddress = async (e) => {
  //   setloading(true);
  //   // e.preventDefault();
  //   const addrTitle = document.getElementById("addrType").value;
  //   const address = document.getElementById("address").value;
  //   const postalCode = document.getElementById("postalCode").value;
  //   await axios
  //     .post(
  //       "https://api.inparde.com/api/fa/address/store",
  //       {
  //         uid: uid,
  //         title: addrTitle,
  //         state: selectedState,
  //         city: selectedCity,
  //         address: address,
  //         zipcode: postalCode,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setloading(false);
  //       if (!response.data.error) {
  //         getAddressInfo();
  //       }
  //     })
  //     .catch((err) => {
  //       setloading(false);
  //       console.log(err);
  //     });
  // };
  return (
    <div className="bg-[url(/decor1.jpg)]  bg-contain flex flex-col w-full h-auto min-h-screen pt-40 pb-[10rem] place-items-center place-content-center  bg-[#FFFCFB] ">
      {/* <Loading loading={loading} /> */}
      {/* <Image src={} /> */}
      <section className="max-sm:w-[94%] grid grid-cols-3 w-[700px] max-w-[700px] h-20 border border-gray-300 bg-[#218EFF] border-b-0 text-right ">
        <div
          onClick={() => {
            setshowProfileForm(true);
            setshowAddrForm(false);
            setshowAddrLists(false);
          }}
          className={` hover:cursor-pointer border-l border-l-gray-300  ${
            showProfileForm
              ? ` bg-[#D6ECFF] text-[#132440] border-b-0 transition-colors `
              : `bg-[#218EFF] border-b transition-colors`
          }  place-content-center place-items-center px-3 justify-center`}
        >
          <h1>مشخصات کاربری</h1>
        </div>
        <div
          onClick={() => {
            setshowProfileForm(false);
            setshowAddrForm(true);
            setshowAddrLists(false);
          }}
          className={` hover:cursor-pointer ${
            showAddrForm
              ? ` bg-[#D6ECFF] text-[#132440] border-b-0 transition-colors `
              : `bg-[#218EFF] border-b transition-colors`
          }  border-l border-l-gray-300 place-content-center place-items-center px-3 justify-center`}
        >
          <h1>ایجاد آدرس جدید</h1>
        </div>
        <div
          onClick={() => {
            setshowProfileForm(false);
            setshowAddrForm(false);
            setshowAddrLists(true);
          }}
          className={` hover:cursor-pointer ${
            showAddrLists
              ? ` bg-[#D6ECFF] text-[#132440] border-b-0 transition-colors `
              : `bg-[#218EFF] border-b transition-colors`
          }  border-l border-l-gray-300 place-content-center place-items-center px-3 justify-center`}
        >
          <h1>آدرس های من </h1>
        </div>
      </section>
      {showProfileForm && (
        <form className=" max-sm:w-[94%] text-[#132440] flex flex-col place-content-center place-items-center gap-4 w-[700px] max-w-[700px] px-3 bg-white pt-4 pb-4 ">
          {/* <Image src={avatar ? avatar : "/profile.png"} alt='avatar' width={100} height={100} className=' w-[120px] h-[120px] rounded-[60px] border border-[#CD2C58]  rounded-md  '/> */}
          <label htmlFor="userName" className=" -mb-3 w-full flex  ">
            نام کاربری
          </label>
          <input
            type="text"
            defaultValue={name}
            id="userName"
            className=" w-full border border-[#CD2C58] rounded-md text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
          />
          <label htmlFor="tel" className=" -mb-3 w-full flex ">
            شماره تماس
          </label>
          <input
            type="tel"
            id="tel"
            readOnly
            disabled
            className=" w-full border border-[#CD2C58]  rounded-md  text-[#b5b4b4] text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
            defaultValue={mobile}
          />
          <label htmlFor="email" className=" -mb-3 w-full flex ">
            آدرس ایمیل
          </label>
          <input
            type="email"
            id="email"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
            defaultValue={email}
          />
          <label htmlFor="date" className=" -mb-3 w-full flex ">
            تاریخ تولد
          </label>
          <input
            type="date"
            id="date"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
            defaultValue={birthday}
          />
          <label htmlFor="state" className=" -mb-3 w-full flex ">
            استان
          </label>
          {/* <input list="states" id='state'  className=' w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] ' defaultValue={state} />  */}
          <select
            id="state-select"
            onChange={(event) => handleStateChange(event)}
            value={selectedState}
            dir="rtl"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
          >
            <option dir="rtl" value="" disabled>
              انتخاب کنید
            </option>
            {Object.keys(StatesList).map((statee) => (
              <option dir="rtl" key={statee} value={statee}>
                {statee}
              </option>
            ))}
          </select>
          <label htmlFor="city" className=" -mb-3 w-full flex ">
            شهر
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!cities.length}
            dir="rtl"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
          >
            <option dir="rtl" value="" disabled>
              یک شهر را انتخاب کنید
            </option>
            {cities.map((city) => (
              <option dir="rtl" key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {/* <label htmlFor='city'   className=' -mb-3 w-full flex  '>شهر محل سکونت</label>
           <input type="text" defaultValue={city} id='city'  className=' w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] '  /> */}
          <label htmlFor="gender" className=" -mb-3 w-full flex ">
            جنسیت{" "}
          </label>
          <section className=" flex flex-row w-[60%] justify-between ">
            <div className=" flex flex-row place-content-center place-items-center gap-1">
              <label for="female">زن</label>
              <br></br>
              <input type="radio" name="gender" id="female" />
            </div>
            <div className=" flex flex-row place-content-center place-items-center gap-1">
              <label for="man">مرد</label>
              <br></br>
              <input type="radio" name="gender" id="man" />
            </div>
          </section>
          <label htmlFor="gender" className=" -mb-3 w-full flex ">
            {`درباره ی  من`}{" "}
          </label>
          <textarea
            id="aboutme"
            className=" resize-none w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-20 focus:outline-none focus:border-[#1c1b1b] "
          ></textarea>

          <div
            type="sumbit"
            onClick={(e) => updateProfile(e)}
            className=" mt-10 relative overflow-hidden w-full text-center py-3 place-content-center place-items-center justify-center font-medium text-black bg-[#D71313]/80 rounded-md border border-[#e2e2e2] transition-all duration-500 ease-out group cursor-pointer "
          >
            <span className="absolute inset-0 bg-white transition-transform duration-500 ease-out transform translate-x-full group-hover:translate-x-0"></span>
            <h1 className="relative text-white transition-colors duration-500 ease-out group-hover:text-black">
              ثبت
            </h1>
          </div>
        </form>
      )}

      {showAddrForm && (
        <form className="max-sm:w-[94%] text-[#132440] flex flex-col place-content-center place-items-center gap-4 w-[700px] max-w-[700px] px-3 bg-white pt-4 pb-4 ">
          {/* <Image src={avatar ? avatar : "/profile.png"} alt='avatar' width={100} height={100} className=' w-[120px] h-[120px] rounded-[60px] border border-[#CD2C58]  rounded-md  '/> */}
          <label htmlFor="addrType" className=" -mb-3 w-full flex  ">
            نوع آدرس
          </label>
          <input
            type="text"
            placeholder="منزل محیط کار باشگاه..."
            id="addrType"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
          />
          <label htmlFor="state" className=" -mb-3 w-full flex ">
            استان
          </label>
          {/* <input list="states" id='state'  className=' w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] ' defaultValue={state} />  */}
          <select
            id="state-select"
            onChange={(event) => handleStateChange(event)}
            value={selectedState}
            dir="rtl"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
          >
            <option dir="rtl" value="" disabled>
              انتخاب کنید
            </option>
            {Object.keys(StatesList).map((statee) => (
              <option dir="rtl" key={statee} value={statee}>
                {statee}
              </option>
            ))}
          </select>
          <label htmlFor="city" className=" -mb-3 w-full flex ">
            شهر
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!cities.length}
            dir="rtl"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
          >
            <option dir="rtl" value="" disabled>
              یک شهر را انتخاب کنید
            </option>
            {cities.map((city) => (
              <option dir="rtl" key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {/* <input type="date" id='date'  className=' w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] ' defaultValue={birthday} /> */}
          <label htmlFor="city" className=" -mb-3 w-full flex  ">
            آدرس
          </label>
          <textarea
            cols={3}
            rows={5}
            type="text"
            id="address"
            className=" resize-none w-full border border-[#CD2C58]  rounded-md  text-right px-3 focus:outline-none focus:border-[#1c1b1b] "
          />
          <label htmlFor="postalCode" className=" -mb-3 w-full flex ">
            کد پستی{" "}
          </label>
          <input
            type="text"
            placeholder="**********"
            id="postalCode"
            className=" w-full border border-[#CD2C58]  rounded-md  text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] "
          />

          <div
            type="sumbit"
            onClick={(e) => createAddress(e)}
            className=" mt-10 relative overflow-hidden w-full text-center py-3 place-content-center place-items-center justify-center font-medium text-black bg-[#D71313]/80 rounded-md border border-[#e2e2e2] transition-all duration-500 ease-out group cursor-pointer "
          >
            <span className="absolute inset-0 bg-white transition-transform duration-500 ease-out transform translate-x-full group-hover:translate-x-0"></span>
            <h1 className="relative text-white transition-colors duration-500 ease-out group-hover:text-black">
              ثبت
            </h1>
          </div>
        </form>
      )}

      {showAddrLists && (
        <div className="max-sm:w-[80%] flex flex-col place-content-center place-items-center gap-4 w-[700px] max-w-[700px] px-3 bg-white pt-4 pb-4 ">
          {AddressListArray.map((item, index) => {
            return (
              <section key={index}>
                <h1>{item.title} </h1>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
