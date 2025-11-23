"use client";
import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import useoffIdStore from "../store/offIdStore";
import usebasketUserCode from "../store/basketUserCode";
import usebasketIdStore from "../store/basketIdStore";
import useuidStore from "../store/uidStore";
import usetokenStore from "../store/tokenStore";
import Swal from "sweetalert2";
import axios from "axios";

const PickAddress = () => {
  const router = useRouter();
  const uid = useuidStore((state) => state.Uid);
  const [AddressListArray, setAddressListArray] = useState([]);
  const [loading, setloading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash = process.env.NEXT_PUBLIC_XDOMAINHASH;
  const token = usetokenStore((state) => state.token);

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
        if (data.length === 0) {
          setloading(false);
        } else {
          setAddressListArray(data);
        }
        setloading(false);
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

  useEffect(() => {
    getAddressInfo();
    getStatesList();
  }, []);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setCities(StatesList[state]);
    setSelectedCity(""); // Reset the city selection
  };
  const [selectedState, setSelectedState] = useState("");
  const [StatesList, setStatesList] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [ShowCreateNewAddr, setShowCreateNewAddr] = useState(false);
  const offId = useoffIdStore((state) => state.offIceCreamId);
  const basketId = usebasketIdStore((state) => state.IceCreamBasketId);
  const basketUserCode = usebasketUserCode(
    (state) => state.IceCreamBasketUserCode
  );
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const [selectedAddrId, setselectedAddrId] = useState();
  const handleSelectedAddr = (value, addrId) => {
    if (value) {
      setselectedAddrId(addrId);
    } else {
      console.log("یک آدرس را انتخاب کنید");
      setselectedAddrId(null);
    }
  };
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
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "X-Domain-Hash": xdomainhash,
  //       },
  //     });
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setloading(false);
  //       throw new Error(errorData.message || "خطایی رخ داد");
  //     } else {
  //       const data = await response.json();
  //       if (!data.error) {
  //         setStatesList(data.data);
  //       } else {
  //         setloading(false);
  //       }
  //       setloading(false);
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
        console.log(data);
        if (!data.error) {
          Swal.fire({
            title: data.message,
            icon: "success",
            draggable: true,
          });
          getAddressInfo();
          setloading(false);
        }
        setloading(false);
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
  const { resetStorage } = usebasketIdStore();
  const { resetStorageIceCream } = usebasketUserCode();
  const { resetStorageoffId } = useoffIdStore();
  const sendToFinalUrl = async () => {
    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/runpayorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-Domain-Hash": xdomainhash,
        },
        body: JSON.stringify({
          basketid: basketId,
          usercode: basketUserCode,
          discountid: offId,
          addressid: selectedAddrId,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        if (!data.error) {
          setloading(false);
          resetStorage();
          resetStorageIceCream();
          resetStorageoffId();
          setselectedAddrId("");
          router.push(data.data.url);
        }
        setloading(false);
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
  return (
    <div
      name={"addr"}
      className=" flex flex-col text-[#132440] bg-[#FFFCFB] place-content-center place-items-center gap-4 w-full h-auto min-h-[100vh] px-3  pt-5 pb-10 "
    >
      <h1 className=" text-[18px] font-bold mt-10 text-[#132440] ">نشانی های منتخب</h1>
      <Loading loading={loading} />

      {AddressListArray !== 0 && (
        <>
          {AddressListArray?.map((item, index) => {
            return (
              <section
                index={index}
                className={`  ${
                  selectedAddrId === item.id
                    ? ` border-0 bg-[#FFF4EF] `
                    : ` border border-[#FF6832] bg-white`
                }  relative mb-3 w-[50%] truncate max-sm:w-[100%] h-[110px] text-black text-[16px] rounde text-right rtl px-2 py-2 flex flex-col gap-3  `}
                key={index}
              >
                <h1 className=" font-semibold text-[14px] max-sm:text-[12px] ">
                  {item.title}{" "}
                </h1>
                <p
                  dir="rtl"
                  className=" flex flex-row gap-4 text-black text-[18px] "
                >
                  <h1 className=" text-[#3E3E3E] text-[12px]  ">نشانی:</h1>
                  <h1 className=" font-semibold text-[14px] max-sm:text-[12px] ">
                    {item.state} - {item.city}{" "}
                  </h1>
                  <h1 className=" font-semibold text-[14px] max-sm:text-[12px] ">
                    {item.address}
                  </h1>
                </p>
                <p
                  dir="rtl"
                  className=" flex flex-row gap-4 text-black text-[18px] "
                >
                  <h1 className="text-[#3E3E3E] text-[12px] ">کد پستی :</h1>
                  <h1 className=" font-semibold text-[14px] max-sm:text-[12px] ">
                    {item.zipcode}{" "}
                  </h1>
                </p>
                <input
                  for={"addr"}
                  id={`addr-${index}`}
                  type="checkbox"
                  checked={selectedAddrId === item.id}
                  onChange={(v) => {
                    handleSelectedAddr(v.target.checked, item.id);
                  }}
                  className=" absolute left-2 top-1/2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </section>
            );
          })}
          <div
            onClick={() => {
              if (selectedAddrId) {
                sendToFinalUrl();
              } else {
                setShowCreateNewAddr(!ShowCreateNewAddr);
              }
            }}
            className={`mt-16 mb-10 bg-[#FF6832] max-sm:m-4 relative overflow-hidden cursor-pointer border-black px-16 py-3 font-medium text-black  ${
              selectedAddrId ? ` rounded-lg ` : `  hidden `
            }  border  transition-all duration-500 ease-out group`}
          >
            <span className="absolute inset-0 bg-[#efefef]  transition-transform duration-500 ease-out transform translate-x-full group-hover:translate-x-0"></span>

            <span className="relative text-white transition-colors duration-500 ease-out group-hover:text-black ">
              پرداخت
            </span>
          </div>
          <div
            onClick={() => {
              setselectedAddrId("");
              setShowCreateNewAddr(true);
            }}
            className={`mt-1 mb-10 bg-[#FF6832] max-sm:m-4 relative overflow-hidden cursor-pointer border-black px-10 py-3 font-medium text-white rounded-lg 
            border  transition-all duration-500 ease-out group`}
          >
            <span className="absolute inset-0 bg-[#efefef] transition-transform duration-500 ease-out transform translate-x-full group-hover:translate-x-0"></span>

            <span className="relative text-white transition-colors duration-500 ease-out group-hover:text-black">
              ایجاد آدرس جدید
            </span>
          </div>
        </>
      )}
      {ShowCreateNewAddr && (
        <form className=" bg-[#FFF4EF] rounded-md p-5 flex flex-col place-content-center place-items-center gap-4 w-[700px] max-sm:w-[85%] max-w-[700px] px-3  pt-4 pb-4 max-sm:h-auto h-auto min-h-[50vh] max-sm:min-h-[50%] max-sm:mb-[30%] mb-4 ">
          <label
            htmlFor="addrType"
            className=" -mb-3 w-full flex place-content-start "
          >
            نوع آدرس
          </label>
          <input
            type="text"
            placeholder="منزل محیط کار باشگاه..."
            id="addrType"
            className=" w-full border border-[#FF6832] text-right px-3 h-10 focus:outline-none focus:border-[#732509] "
          />
          <label
            htmlFor="state"
            className=" -mb-3 w-full flex place-content-start"
          >
            استان
          </label>
          {/* <input list="states" id='state'  className=' w-full border border-[#cfcfcf] text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] ' defaultValue={state} />  */}
          <select
            id="state-select"
            onChange={(event) => handleStateChange(event)}
            value={selectedState}
            dir="rtl"
            className=" w-full border border-[#FF6832] text-right px-3 h-10 focus:outline-none focus:border-[#732509] "
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
          <label
            htmlFor="city"
            className=" -mb-3 w-full flex place-content-start"
          >
            شهر
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!cities.length}
            dir="rtl"
            className=" w-full border border-[#FF6832] text-right px-3 h-10 focus:outline-none focus:border-[#732509] "
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
          {/* <input type="date" id='date'  className=' w-full border border-[#cfcfcf] text-right px-3 h-10 focus:outline-none focus:border-[#1c1b1b] ' defaultValue={birthday} /> */}
          <label
            htmlFor="city"
            className=" -mb-3 w-full flex place-content-start "
          >
            آدرس
          </label>
          <textarea
            cols={3}
            rows={5}
            type="text"
            id="address"
            className=" resize-none w-full border border-[#FF6832] text-right px-3 focus:outline-none focus:border-[#732509] "
          />
          <label
            htmlFor="postalCode"
            className=" -mb-3 w-full flex place-content-start"
          >
            کد پستی{" "}
          </label>
          <input
            type="text"
            placeholder="**********"
            id="postalCode"
            className=" w-full border border-[#FF6832] text-right px-3 h-10 focus:outline-none focus:border-[#732509] "
          />

          <div
            type="sumbit"
            onClick={(e) => createAddress(e)}
            className=" mt-10 relative overflow-hidden w-full text-center py-3 place-content-center place-items-center justify-center font-medium text-black bg-[#FF6832] border border-[#FF6832] transition-all duration-500 ease-out group cursor-pointer "
          >
            <span className="absolute inset-0 bg-white transition-transform duration-500 ease-out transform translate-x-full group-hover:translate-x-0"></span>
            <h1 className="relative text-white transition-colors duration-500 ease-out group-hover:text-black">
              ثبت
            </h1>
          </div>
        </form>
      )}
    </div>
  );
};

export default PickAddress;
