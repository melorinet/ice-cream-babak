
import EditBanner from "../../../components/EditBanner";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <main className=" w-full flex flex-col text-zinc-500 pb-[10rem] gap-[1rem] h-auto min-h-[100vh]   bg-[#E5E5E5] ">
      <Header />
      <EditBanner id={id} />
      <Footer />
    </main>
  );
};

export default page;
