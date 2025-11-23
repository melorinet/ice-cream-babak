"use client";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import useBasketStore from "../store/basketStore";
import useUniquIdStore from "../store/uniquIdStore";
import usebasketIdStore from "../store/basketIdStore";
import usebasketUserCode from "../store/basketUserCode";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import Loading from "./Loading";
import { IoIosClose } from "react-icons/io";
import useoffIdStore from "../store/offIdStore";
import { useRouter } from "next/navigation";
import usetokenStore from "../store/tokenStore";
import Header from "./Header";
import { FaAnglesLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const Basket = (props) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [alertmsg, setalertmsg] = useState("");
  const Basketref = useRef(null);
  const addoffId = useoffIdStore((state) => state.addoffIceCreamId);
  const offId = useoffIdStore((state) => state.offIceCreamId);
  const items = useBasketStore((state) => state.itemsIceCream);
  const removeItem = useBasketStore((state) => state.removeItem);
  const updateItems = useBasketStore((state) => state.updateItems);
  const addBasketId = usebasketIdStore((state) => state.addIceCreamBasketId);
  const token = usetokenStore((state) => state.token);
  const addBasketUserCode = usebasketUserCode(
    (state) => state.addIceCreamBasketUserCode
  );
  const inpardeBasketId = usebasketIdStore((state) => state.IceCreamBasketId);
  const offmoreBasketUserCode = usebasketUserCode(
    (state) => state.IceCreamBasketUserCode
  );
  const [offCode, setoffCode] = useState("");
  const MinusItemCount = (index, pId) => {
    const updatedItems = items.map((item, i) =>
      i === index
        ? { ...item, count: item.count - 1 <= 1 ? 1 : item.count - 1 }
        : item
    );

    updateItems(updatedItems);
  };
  const PlusItemCount = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index
        ? { ...item, count: item.count + 1 >= 10 ? 10 : item.count + 1 }
        : item
    );
    updateItems(updatedItems);
  };

  const [offAmount, setoffAmount] = useState(0);
  const CalculateTotalPriceByOff = (percent, amount) => {
    if (percent > 0) {
      setoffAmount(totalPrice * (percent / 100));
      let calculatedTotalPrice = totalPrice - totalPrice * (percent / 100);
      settotalPrice(calculatedTotalPrice);
    } else if (percent === 0 && amount > 0) {
      let lastTotalPrice = totalPrice - amount;
      setoffAmount(amount);
      settotalPrice(lastTotalPrice);
    }
  };
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash = process.env.NEXT_PUBLIC_XDOMAINHASH;
  const sendBasketToServer = async () => {
    setloading(true);
    if (token) {
      try {
        const updatedFinalBasketArray = items.map((item) => ({
          post_id: item.selectedSizeId ? item.selectedSizeId : item.id,
          total: item.count,
        }));

        // console.log(`${BASE_URL}/addtobasket`);
        // console.log(`basketid:${inpardeBasketId}`);
        // console.log(`usercode:${offmoreBasketUserCode}`);
        // console.log(`basket_items:${updatedFinalBasketArray}`);
        // console.log(`discount_id:${offId}`);
        // console.log(`xdomainhash:${xdomainhash}`)
        // console.log(`token:${token}`)

        if (updatedFinalBasketArray.length === 0) {
          setshowAlert(true);
          setalertmsg("سبد خرید شما خالی است");
          setloading(false);
        } else {
          const response = await fetch(`${BASE_URL}/api/addtobasket`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "X-Domain-Hash": xdomainhash,
            },
            body: JSON.stringify({
              basketid: inpardeBasketId === "" ? null : inpardeBasketId,
              usercode:
                offmoreBasketUserCode === 0 ? null : offmoreBasketUserCode,
              basket_items: updatedFinalBasketArray,
              discount_id: offId,
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
              addBasketId(data.data.basket_id);
              addBasketUserCode(data.data.usercode);
              router.push("/landing/pickAddress");
            } else {
              setshowAlert(true);
              setalertmsg(data.message);
            }
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
    } else {
      setshowAlert(true);
      setalertmsg("لطفا ابتدا وارد حساب کاربری شوید");
    }
  };
  // const sendBasketToServer = async () => {
  //   if (token) {
  //     setloading(true);
  //     const updatedFinalBasketArray = items.map((item) => ({
  //       post_id: item.selectedSizeId ? item.selectedSizeId : item.id,
  //       total: item.count,
  //     }));
  //     if (updatedFinalBasketArray.length === 0) {
  //       setshowAlert(true);
  //       setalertmsg("سبد خرید شما خالی است");
  //       setloading(false);
  //     } else {
  //       await axios
  //         .post("https://api.inparde.com/api/fa/addtobasket", {
  //           basketid: inpardeBasketId === "" ? null : inpardeBasketId,
  //           usercode:
  //             offmoreBasketUserCode === 0 ? null : offmoreBasketUserCode,
  //           basket_items: updatedFinalBasketArray,
  //           discount_id: offId,
  //         })
  //         .then((res) => {
  //           if (!res.data.error) {
  //             addBasketId(res.data.data.basket_id);
  //             addBasketUserCode(res.data.data.usercode);
  //             router.push("/landing/pickAddress");
  //           } else {
  //             setshowAlert(true);
  //             setalertmsg(res.data.message);
  //           }
  //           setloading(false);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   } else {
  //     setshowAlert(true);
  //     setalertmsg("لطفا ابتدا وارد حساب کاربری شوید");
  //   }
  // };
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const { resetStorage } = useBasketStore();
  const ResetBasket = () => {
    clearBasket();
    resetStorage();
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (Basketref.current && !Basketref.current.contains(event.target)) {
  //       props.closeBasket(); // Close the basket
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   document.addEventListener("touchstart", handleClickOutside); // Add touch event for mobile

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside); // Cleanup
  //   };
  // }, [])

  const [stableTotalPrice, setstableTotalPrice] = useState([]);
  const [totalPrice, settotalPrice] = useState([]);
  useEffect(() => {
    let myPriceArr = items.map((item) => item.price * item.count);
    let totalPrice = myPriceArr.reduce((acc, price) => acc + price, 0);
    settotalPrice(totalPrice);
    setstableTotalPrice(totalPrice);
  }, [items]);

  const sendOffCodeToServer = async () => {
    setloading(false);
    try {
      const response = await fetch(`${BASE_URL}/api/discount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Domain-Hash": xdomainhash,
        },
        body: JSON.stringify({
          code: offCode,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setloading(false);
        throw new Error(errorData.message || "خطایی رخ داد");
      } else {
        const data = await response.json();
        if (!data.error) {
          let mydata = data.data;
          addoffId(mydata.id);
          CalculateTotalPriceByOff(mydata.percent, mydata.amount);
        }
        setloading(false);
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
  // const sendOffCodeToServer = async () => {
  //   setloading(true);
  //   await axios
  //     .post("https://api.inparde.com/api/fa/discount", {
  //       code: offCode,
  //     })
  //     .then((res) => {
  //       if (!res.data.error) {
  //         let mydata = res.data.data;
  //         addoffId(mydata.id);
  //         CalculateTotalPriceByOff(mydata.percent, mydata.amount);
  //       } else {
  //         setshowAlert(true);
  //         setalertmsg(res.data.message);
  //       }
  //       setloading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setloading(false);
  //     });
  // };
  function toPersianNumber(num) {
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  return (
    <div className=" w-full h-auto min-h-screen flex-wrap bg-[#FFFCFB] flex flex-col ">
      <Header />
      <div
        ref={Basketref}
        className={`  pt-[1%] bg-scroll mt-[5.6rem] place-content-start self-end flex flex-col w-auto min-w-[30vw] place-items-center bg-gray-50  transition-transform duration-500 max-sm:w-full max-sm:h-auto max-sm:min-h-screen max-sm:overflow-y-scroll max-sm:bottom-0 max-sm:top-full max-sm:pt-2 max-sm:self-start 
      `}
      >
        <Loading loading={loading} />
        <section className=" flex flex-row w-full h-[7%] max-sm:h-[3%] justify-between px-3 place-content-center place-items-center ">
          <span className=" text-[#132440] text-[18px] self-center text-center w-full font-bold">
            سبد خرید
          </span>
          {/* <IoMdClose
          onClick={() => props.closeBasket()}
          color="#000"
          size={24}
          className=" hover:cursor-pointer"
        /> */}
        </section>

        {items?.length > 0 ? (
          <ul className=" mt-1 max-sm:mt-3 px-3 pb-[50%] bg-scroll overflow-hidden w-full overflow-y-scroll h-auto bg-gray-50">
            {items?.map((item, index) => {
              return (
                <li
                  className=" text-[#132440] flex flex-row-reverse w-full overflow-hidden place-content-center place-items-center justify-between px-3 max-sm:px-1 mb-2 bg-[#FFFCFB] border border-[#093FB4]/70 drop-shadow-md drop-shadow-red-300 rounded-md  "
                  key={index}
                >
                  <section className=" flex flex-col mr-1 max-sm:pr-3 min-w-[70%] max-w-full py-3.5 place-items-start ">
                    <div className=" flex flex-col max-sm:flex-row-reverse text-right gap-[1rem] w-fit  p-0">
                      <span className=" text-[18px] text-[#132440]  w-full h-fit text-right justify-start self-start ">
                        {item.name}
                      </span>

                      {/* <h2 className=" opacity-0  text-[#828282] text-[12px] ">
                      {`${item.selectedSizeNum} سایز `}{" "}
                    </h2> */}
                    </div>

                    <section className=" grid grid-cols-2 gap-5 pr-3 place-content-between mt-[2rem] place-items-center  ">
                      <div className=" flex flex-row gap-2 place-items-center">
                        <span className=" font-sans text-[#132440] text-[18px] ">
                          تومان
                        </span>
                        <span className=" text-[#132440] text-[16px] ">
                          {(item.price * item.count).toLocaleString("fa-IR")}{" "}
                        </span>
                      </div>
                      <FiTrash2
                        className=" active:shadow-xl hover:cursor-pointer shadow-2xl "
                        onClick={() => removeItem(item.id, item.selectedSizeId)}
                        color="#D71313"
                        size={24}
                      />
                      {/* Num of items  */}
                      <div className=" flex flex-row gap-[2.5rem] w-[10rem] col-span-2 text-white rounded-3xl px-8 bg-[#218EFF]/70 border border-[#218EFF]  h-[3rem] place-content-center place-items-center ">
                        <div
                          onClick={() => MinusItemCount(index, item.id)}
                          className=" hover:cursor-pointer text-[24px]  "
                        >
                          -
                        </div>
                        <span className=" text-[20px]  ">
                          {toPersianNumber(item.count)}
                        </span>
                        <div
                          onClick={() => PlusItemCount(index)}
                          className=" hover:cursor-pointer text-[24px] "
                        >
                          +
                        </div>
                      </div>
                    </section>
                  </section>

                  {/* <Image */}
                  <img
                    className=" max-sm:h-[100px] max-sm:w-[100px] "
                    src={item.image}
                    alt="cartImage"
                    width={100}
                    height={100}
                    quality={90}
                  ></img>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className=" text-[#132440] font-bold text-xl self-center mt-40 ">
            سبد شما خالی است
          </p>
        )}
        {/* {items.length > 0 && (
        <button
          className=" text-gray-500 hover:underline"
          onClick={ResetBasket}
        >
          تمامی محصولات را پاک کن
        </button>
      )} */}
        <div className=" fixed max-sm:text-[8px] bg-white  grid grid-cols-2 bottom-16 w-[96%] pt-2 text-[18px] place-content-center place-items-center font-bold text-white bgb hover:shadow-2xl  hover:cursor-pointer hover:text-white  active:shadow-2xl ">
          {showAlert ? (
            <section className=" fixed   bg-[rgba(0,0,0,0.5)] bottom-0 right-0 left-0 top-0 w-full h-full z-50 flex-col-reverse justify-between place-items-center place-content-center row-span-4">
              <div className=" bg-[#FFFCFB] w-[94%] rounded-md h-[14rem] flex flex-col gap-3 place-content-center place-items-center ">
                <h1 className=" self-center  text-[#132440] text-[24px] font-light ">
                  {alertmsg}{" "}
                </h1>
                <button
                  className=" w-[94%] h-[3rem] text-[18px] bg-[#D71313]/70 rounded-md self-center "
                  onClick={() => setshowAlert(false)}
                >
                  بستن
                </button>
              </div>
            </section>
          ) : (
            <>
              <div className=" flex flex-row text-right px-3 text-[#132440] text-[12px] font-light h-10 place-items-center bg-[#E5E7EB] gap-2 mb-3 w-[90%] place-content-between ">
                <div className=" flex flex-row gap-2 place-items-center">
                  <span className=" font-sans text-[#D71313] font-bold text-[12px] ">
                    تومان
                  </span>
                  <h1 className=" text-[#D71313] font-bold ">
                    {offAmount.toLocaleString("fa-IR")}
                  </h1>
                </div>

                <h1 className=" max-sm:text-[12px] ">تخفیف</h1>
              </div>
              <div className=" flex flex-row  text-[12px] font-light text-right h-10 place-items-center  bg-[#E5E7EB] mb-3 w-[90%] place-content-between ">
                <button
                  onClick={() => sendOffCodeToServer()}
                  className=" bg-[#D71313] w-[20%] max-sm:w-[30%] h-full place-content-center place-items-center text-center hover:bg-red-950 "
                >
                  ثبت
                </button>
                <input
                  type="text"
                  className=" max-sm:hidden font-bold flex text-right w-[80%] h-full pr-3 text-[#132440] placeholder-slate-400 "
                  placeholder="کد تخفیف را دارید؟وارد کنید"
                  id="offCode"
                  onChange={(value) => {
                    console.log(value.target.value);
                    setoffCode(value.target.value);
                  }}
                ></input>
                <input
                  type="text"
                  className=" font-bold max-sm:flex hidden text-right w-[70%] h-full pr-3 text-[#132440] placeholder-slate-400 "
                  placeholder="کد تخفیف؟"
                ></input>
              </div>
              {/* <div className=" flex flex-row text-right px-3 h-10 place-items-center  bg-[#E5E7EB] gap-2 mb-3 w-[90%]">33</div> */}
              <div className=" flex flex-row text-right px-3 text-[#132440] text-[12px] max-sm:text-[10px] font-light h-10 place-items-center bg-[#E5E7EB] gap-2 mb-3 w-[90%] place-content-between ">
                <div className=" flex flex-row gap-2 place-items-center ">
                  <span className=" font-sans text-[#132440] text-[12px] font-bold ">
                    تومان
                  </span>
                  <h1 className=" font-bold text-[#132440] text-[12px] ">
                    {totalPrice.toLocaleString("fa-IR")}
                  </h1>
                </div>
                <h2 className="  max-sm:text-[10px]">مبلغ قابل پرداخت</h2>
              </div>
              {/* <div className=" flex flex-row text-right px-3  h-10 place-items-center bg-[#E5E7EB] gap-2 mb-3 w-[90%] ">33</div> */}
              <div className=" flex flex-row text-right px-3 text-[#132440] text-[12px] font-light h-10 place-items-center bg-[#E5E7EB] gap-2 mb-3 w-[90%] place-content-between ">
                <div className=" flex flex-row gap-2 place-items-center">
                  <span className=" font-sans text-[#132440] text-[12px] font-bold ">
                    تومان
                  </span>
                  <h1 className=" font-bold text-[#132440] text-[12px] ">
                    {stableTotalPrice.toLocaleString("fa-IR")}
                  </h1>
                </div>
                <h1 className=" max-sm:text-[10px]">جمع کل </h1>
              </div>
            </>
          )}
        </div>

        <div
          onClick={() => sendBasketToServer()}
          className=" fixed bottom-1 w-[94%] text-[16px] flex flex-row-reverse gap-3 place-content-center place-items-center font-bold bg-green-700 rounded-md text-white bgb hover:shadow-2xl border border-gray-400  hover:cursor-pointer hover:text-white  active:shadow-2xl py-4 "
        >
          <FaAnglesLeft />
          اقدام به پرداخت
        </div>
      </div>
    </div>
  );
};

export default Basket;
