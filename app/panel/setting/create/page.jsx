import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateSetting from "../../components/CreateSetting";

const page = () => {
  return (
    <main className=" w-full flex flex-col text-zinc-500  gap-[1rem] h-auto min-h-[110vh] pb-[10rem]   bg-[#E5E5E5] ">
      <Header />
      <CreateSetting />
      <Footer />
    </main>
  );
};

export default page;
