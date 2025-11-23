import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import React from "react";
import CreateBanner from "../../../components/CreateBanner";

const page = async ({ params }) => {
  const { type } = await params;
  return (
    <main className=" w-full flex flex-col text-zinc-500  gap-[1rem] h-auto min-h-[110vh] pb-[10rem]   bg-[#E5E5E5] ">
      <Header />
      <CreateBanner type={type} />
      <Footer />
    </main>
  );
};

export default page;
