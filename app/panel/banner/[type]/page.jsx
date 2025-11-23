import React from 'react'
import BannerList from '../../components/BannerList';

const page =async ({params}) => {
const {type} = await params;
  return (
    <BannerList type={type} />
  )
}

export default page