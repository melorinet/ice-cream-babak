"use client"
import React from 'react'
import  GridLoader  from 'react-spinners/GridLoader'

export default function Loading (){
  return (
    <div className= {`w-[100vw] h-full fixed top-0 bg-[rgba(0,0,0,0.5)] place-content-center place-items-center z-40 flex  `} >
           <GridLoader
            color={"#6b7280"}
            loading={true}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
    </div>
  )
}

