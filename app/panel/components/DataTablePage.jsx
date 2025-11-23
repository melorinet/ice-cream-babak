"use client"
import React from 'react'
import DataTable from "react-data-table-component";

const data = [
  { id: 1, name: "فرزاد نقشین", email: "alice@example.com", age: 25,buyamount:100 },
  { id: 2, name: "ملورین نقشین", email: "bob@example.com", age: 30,buyamount:30 },
  { id: 3, name: "زهرا گنجی", email: "charlie@example.com", age: 35 ,buyamount:10},
  { id: 4, name: "نازی ولیزاده", email: "diana@example.com", age: 28,buyamount:5 },
];

const columns = [
  {
    name: "ردیف",
    selector: row => row.id,
    sortable: true,
    width: "80px",
  },
  {
    name: "نام",
    selector: row => row.name,
    sortable: true,
  },
  {
    name: "ایمیل",
    selector: row => row.email,
    sortable:true
  },
  {
    name: "سن",
    selector: row => row.age,
    sortable: true,
    right: true,
  },
    {
    name: "تعداد خرید",
    selector: row => row.buyamount,
    sortable: true,
    right: true,
  },
];
const customStyles = {
  headCells: {
    style: {
      zIndex: 1, // keep headers low
    },
  },
  cells: {
    style: {
      zIndex: 1, // keep rows low
    },
  },
  pagination: {
    style: {
      zIndex: 1, // pagination under sidebar
    },
  },
};
const DataTablePage = (props) => {
  return (
  <div className="overflow-x-auto text-zinc-700 bg-white w-full rounded-[10px] p-[2rem] ">
  <h2 className="text-xl font-semibold mb-4">کاربران</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        dense
        selectableRows
        customStyles={customStyles}
        // expandableRows
      />
</div>
  )
}

export default DataTablePage