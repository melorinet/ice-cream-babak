"use client"
import React from 'react'
import  GridLoader  from 'react-spinners/GridLoader'

export default function Loading (props){
  return (
    <div className= {`w-[100vw] h-[100vh] fixed top-0 bg-[rgba(0,0,0,0.5)] place-content-center place-items-center z-40 ${props.loading ? ` flex`:` hidden`}  `} >
           <GridLoader
            color={"#6b7280"}
            loading={props.loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
    </div>
  )
}

