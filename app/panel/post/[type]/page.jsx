import React from 'react'
import Link from "next/link";
import Rightbar from "../../components/Rightbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostsList from '../../components/PostsList';

const page = async({params}) => {
    const {type}= await params
  return (
   <PostsList type={type} />
  )
}

export default page