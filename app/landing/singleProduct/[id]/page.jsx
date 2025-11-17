"use client"
import React from "react";
import SingleProduct from "../../../components/SingleProduct";

const page =async({ params }) => {
  const { id } = await params;

  return (
   <SingleProduct id={id} />
  );
};

export default page;
