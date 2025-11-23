"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Rightbar from "./Rightbar";
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2";
import usetokenStore from "../store/tokenStore";
import Loading from "./Loading";
import DataTable from "react-data-table-component";

const PostsList = (props) => {
  const [loading, setloading] = useState(false);
  const token = usetokenStore((state) => state.Melotoken);
  const [PostList, setPostList] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const xdomainhash=process.env.NEXT_PUBLIC_XDOMAINHASH;

  const deleteRow = async (id) => {
    setloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/posts/delete/${id}`,
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
          getPostTableData();
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

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "عنوان",
      selector: (row) => row.title.fa,
      sortable: true,
    },
    {
      name: "بخش",
      selector: (row) => row.categories?.category?.title?.fa ?? "—",
      sortable: true,
    },
    {
      name: "تصویر",
      selector: (row) => (
        <img
          src={`${BASE_URL}/${row.attachments[0]?.url}`}
          alt="preview"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
      sortable: true,
      right: true,
    },
    {
      name: "ویرایش",
      selector: (row) => (
        <Link href={`edit/${row.id}`} className=" border border-gray-300 btn btn-primary">
          ویرایش
        </Link>
      ),
      sortable: true,
      right: true,
    },
    {
      name: "حذف",
      selector: (row) => (
        <button
          onClick={() => deleteRow(row.id)}
          className=" border border-gray-300 btn btn-secondary"
        >
          حذف
        </button>
      ),
      sortable: true,
      right: true,
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        zIndex: 1, // keep headers low
      },
    },
    cells: {
      style: {
        zIndex: 1, // keep rows low
      },
    },
    pagination: {
      style: {
        zIndex: 1, // pagination under sidebar
      },
    },
  };
  const getPostTableData = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/posts/index/${props.type}`,
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
        setPostList(data.data);

        setloading(false);
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

  useEffect(() => {
    getPostTableData();
  }, []);

  return (
    <main className=" w-full relative flex flex-col text-zinc-500  gap-[1rem] h-auto min-h-[100vh] bg-[#E5E5E5] ">
      <Header />
      <Loading loading={loading} />
      <section className=" w-full h-auto flex flex-row justify-between min-h-[80vh] ">
        <div className=" max-sm:hidden">
          <Rightbar />
        </div>
        {/* بخش داخلی  */}
        <div className=" min-h-[100vh] h-auto w-[75vw] pl-[2rem] pb-[10rem]  flex flex-col  ">
          <h1 className=" text-zinc-700 text-[16px] font-semibold ">
            لیست داخلی {props.type}{" "}
          </h1>
          <section className="bg-white min-h-[100vh] h-auto rounded-[10px] w-full mt-[2rem] pt-[2rem]  ">
            <Link
              className=" bg-amber-700 text-white w-[7rem] h-[5rem] p-5 rounded-[10px] mr-[2rem] "
              href={`/panel/post/create/${props.type}`}
            >
              + ایجاد {props.type} جدید
            </Link>
            {/* <Link className=" bg-red-300 mb-10 mr-3 " href={`edit/22`}>
              ویرایش
            </Link> */}
            <section className=" mt-[5rem] w-full px-[1rem] ">
              <DataTable
                columns={columns}
                data={PostList}
                pagination
                highlightOnHover
                striped
                dense
                selectableRows
                customStyles={customStyles}
                // expandableRows
              />
            </section>
          </section>
        </div>
        {/* <Link href={`create/${position}`} >{position}
    ایجاد منوی پوزیشن
     </Link><br />
     <Link href={`edit/22`} >
        ویرایش
     </Link> */}
      </section>
      <Footer />
    </main>
  );
};

export default PostsList;
