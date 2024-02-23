"use client";

// import { Item } from '@radix-ui/react-dropdown-menu';
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/icons/close-icon";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  // await new Promise((resolve) => setTimeout(resolve, 10000));
  // const response = await fetch('/api/menu-items')
  // if(!response){
  //   return('Something went wrong!')
  // }

  // const allMenuItems = await response.then((res) => {
  //   res.json().then((menuItems) => {
  //     setMenuItems(menuItems);
  //   })

  //   return(allMenuItems)
  // })


  useEffect(() => {
    fetch("api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);



  return (
    <div className="text-center mt-24">
      <h2 className="text-4xl text-green-500 font-semibold">Menu Items</h2>

      <div className="flex flex-wrap justify-center items-center gap-4 mt-4 mb-4 px-4">
        {/* ----- All category button -----  */}
        <button className=" font-semibold">All</button>

        <button className=" font-semibold">Salad</button>

        <button className=" font-semibold">🐟Poissons</button>

        <button className=" font-semibold">🥬Légumes</button>

        <button className=" font-semibold">Desserts</button>
        
        <button className=" font-semibold">Drinks</button>


      </div>

      <div className="flex justify-center items-center mt-8 mb-2 w-screen h-screen ">
        <input
          type="text"
          placeholder="Search..."
          // onChange={handleChange}
          className="outline-none pl-4 rounded-md py-2 bg-slate-100 shadow-inner"
        />

        <div className=" text-sm">
          <CloseIcon />
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-2 gap-2 ">
          {menuItems?.map((item, index) => (
            <div
              className=" bg-slate-200 p-2 rounded-md py-2 shadow-md"
              key={index}
            >
              <div>
                <div className=" flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt=""
                    width={100}
                    height={100}
                    className=" rounded-full bg-red-500  "
                  />
                </div>

                <div className=" text-center mb-2 uppercase font-medium mt-2 ">
                  {item.name}
                </div>

                <div className=" text-center mt-2 ">{item.description}</div>

                <div className=" text-center mt-2 ">{item.basePrice}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
