import React from 'react'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import ProfileInfo from '../../components/ProfileInfo'

const page = () => {
  return (
    <div className='w-full flex flex-col h-auto min-h-screen bg-[#FFFCFB] ' >
        <Header />
        <ProfileInfo />
        <BottomNav />
    </div>
  )
}

export default page