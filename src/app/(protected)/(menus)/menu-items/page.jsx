"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "../../../../../hooks/use-current-user";
import { usePathname } from "next/navigation";
import { EditableImage } from "../../../../lib/editableImage";
import { useState, useTransition, useEffect } from "react";
import toast from "react-hot-toast";
import { RightIcon } from "@/components/icons/right-icon";

function MenuItemsPage() {
  const path = usePathname();
  const user = useCurrentUser();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

 

  return (
    <>
      <div className=" flex flex-wrap space-y-2 gap-2 mx-auto justify-center mt-24 items-center">
        <Link
          href={"/settings"}
          className={
            path === "/settings"
              ? " bg-green-500 text-white rounded-full py-2 px-4 "
              : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
          }
        >
          Settings
        </Link>
        {user?.role === UserRole.ADMIN && (
          <>
            <Link
              href={"/categories"}
              className={
                path === "/categories"
                  ? " bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              Categories
            </Link>
            <Link
              href={"/menu-items"}
              className={
                path === "/menu-items"
                  ? " bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              Meun Items
            </Link>
            <Link
              href={"/users"}
              className={
                path === "/users"
                  ? " bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              Users
            </Link>

            <Link
              href={"/orders"}
              className={
                path === "/orders"
                  ? " bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              Orders
            </Link>

            <Link
              href={"/new"}
              className={
                path === "/new"
                  ? " bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              New menu
            </Link>
          </>
        )}
      </div>

      <div className=" mt-12 ">
        {/* max-w-md */}
        <div className=" mt-8 ">
          <div>
            <Link
              className="flex gap-2 justify-center items-center font-semibold"
              href={"/new"}
            >
              <p className="underline-offset-1">Create new menu items</p>
              <RightIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className=" mt-4 z-0">
        <div className=" grid grid-cols-2 gap-2 ">
          {menuItems?.map((item, index) => (
            <div className="bg-slate-200 p-2 rounded-md py-2 shadow-md" key={index}>
              <Link
                href={'/edit-menu/'+item.id} 
              >
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

                <div className=" text-center mt-2 ">
                  {item.description}
                </div>

                <div className=" text-center mt-2 ">
                  {item.basePrice}
                </div>

              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuItemsPage;
