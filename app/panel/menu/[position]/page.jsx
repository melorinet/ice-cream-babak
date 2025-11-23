import React from "react";
import MenuList from "../../components/MenuList";


const page = async ({ params }) => {
  const { position } = await params;
  
  return (
   <MenuList position={position} />
  );
};

export default page;
