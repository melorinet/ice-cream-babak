import React from 'react'
import MoreProducts from '../../../components/MoreProducts'

const page =async ({params}) => {
    const {title}=await params
 
  return (
    <MoreProducts title={title} />
  )
}

export default page