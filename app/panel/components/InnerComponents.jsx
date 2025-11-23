"use client"
import React,{useState} from 'react'
import Rightbar from './Rightbar'
import Dashboard from './Dashboard';
import DataTable from './DataTablePage';
import Forms from './Forms';
import CKeditor from './CKeditorPage'
import CalendarPage from './CalendarPage';


const InnerComponents = (props) => {
  
  return (
    <main className=' w-full flex  flex-row gap-[1rem] h-auto min-h-[100vh] py-[1rem] px-[1rem] bg-[#E5E5E5] ' >
       <div className=' max-sm:hidden' >
         <Rightbar changeActivePage={props.changeActivePage} />
       </div>
        {/* ********menu sub pages */}
        {/* {props.activePage === "top" && <TopMenu/> }
        {props.activePage === "left" && <LeftMenu /> }
        {props.activePage === "right" && <RightMenu /> }
        {props.activePage === "bottom" && <BottomMenu/> }
        {props.activePage === "bottomright" && <BottomRight /> }
        {props.activePage === "bottomleft" && <BottomLeft/> }
        {props.activePage === "bottomcenter" && <BottomCenter/> } */}
        {/* *************** */}
        {props.activePage === "dashboard" && <Dashboard />}
        {props.activePage === "dataTable" && <DataTable />}
        {props.activePage === "forms" && <Forms />}
        {props.activePage === "CKeditor" && <CKeditor/>}
        {props.activePage === "calendar" && <CalendarPage  />} 
    </main>
  )
}

export default InnerComponents