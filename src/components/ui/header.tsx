"use client";

import Image from "next/image";
import Link from "next/link";
// import Usericon from "./icons/Usericon";
import { CardIcon } from "@/components/icons/card-icon";
import { MenuIcon } from "@/components/icons/menu-icon";
import { useState } from 'react';
import { CloseIcon } from "@/components/icons/close-icon";
import { useCurrentUser } from "../../../hooks/use-current-user";
import { UserInfo } from "@/app/(protected)/_components/user-info";
import { useSession } from "next-auth/react";
// import {auth} from '../../../auth';
// import toast from 'react-hot-toast';

export const Header = () => {
  const user = useCurrentUser();

  const session = useSession();
  const status = session.status;
  const [showmenu, setShowmenu] = useState(false);

  const handleShowMenu = () => {
    setShowmenu(!showmenu);

  }

  return (
    <div>
      <header className="bg-gradient-to-r from-[#dbd6d6] from-0% to-[#dbd6d6] to-100% flex items-center justify-between z-100 shadow-md shadow-green-100 w-full fixed top-0 left-0 px-4  ">
        <div>
          <Link href="/">
            <Image src="/LOGO.png" width={70} height={20} alt="logo" className=" cursor-pointer" />
          </Link>
        </div>

        <nav className="flex items-center justify-between relative ">
          <ul className="hidden md:flex  gap-6 font-semibold text-gray-500 absolute -left-60  sm:hidden ">
            <Link className="text-green-500" href={"/"}>
              Home
            </Link>
            <Link className="cursor-pointer" href={"/menus"}>Menus</Link>
            <Link className="cursor-pointer" href={"/order"}>Order</Link>
            <Link className="cursor-pointer" href={"/about"}>About</Link>
            <Link className="cursor-pointer" href={"/settings"}>settings</Link>
            <Link className="cursor-pointer" href={"/contact"}>Contact</Link>
          </ul>

        </nav>
        

        <Link href='/card'>
          <div className="absolute right-48 cursor-pointer md:right-24 xl:right-48 ">
            <CardIcon />
          </div>
        </Link>



        {
          status === "unauthenticated" && (
          
              <Link
                href="/login"
                className="hidden md:block text-white gap-1 bg-[#91e2af] px-6 py-2 rounded-full shadow-md absolute right-8 "
              >
                Login </Link>

          )}



        <nav className="flex items-center gap-4">
          {status === "authenticated" && (
            <UserInfo />
          )}




          {/* Responsive Mode setup */}
        </nav>
        <div onClick={handleShowMenu} className='visible cursor-pointer xl:hidden md:hidden '>
          <MenuIcon />
        </div>

        <div className={
          showmenu ? 'fixed right-0 top-0 w-[65%] h-[600px] rounded-tl-3xl rounded-bl-3xl  bg-[#ecf0f3] p-10 ease-in duration-500 transition-all z-10'
            : 'fixed right-[-100%] top-0 ease-in duration-500'
        }>

          <div className='flex w-full items-center justify-end relative'>
            <div onClick={handleShowMenu} className='cursor-pointer absolute -top-6'>
              <CloseIcon />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">

              <ul className='flex-col py-4 flex '>
                <Link onClick={() => setShowmenu(false)} className="text-green-500 py-4 cursor-pointer text-lg font-semibold" href={"/"}>
                  Home
                </Link>
                <Link onClick={() => setShowmenu(false)} className='py-4 cursor-pointer text-lg font-semibold' href={"/menus"}>Menus</Link>
                <Link onClick={() => setShowmenu(false)} className='py-4 cursor-pointer  text-lg font-semibold' href={"/order"}>Order</Link>
                <Link onClick={() => setShowmenu(false)} className='py-4 cursor-pointer text-lg font-semibold' href={"/about"}>About</Link>
                <Link onClick={() => setShowmenu(false)} className='py-4 cursor-pointer text-lg font-semibold' href={"/settings"}>Settings</Link>
                <Link onClick={() => setShowmenu(false)} className='py-4 cursor-pointer text-lg font-semibold' href={"/contact"}>Contact</Link>
              </ul>

              {status === "authenticated" ? "" :

                <Link onClick={() => setShowmenu(false)}
                  href="/login"
                  className=" text-white gap-1 bg-[#91e2af] px-6 py-2 rounded-full shadow-md "
                >
                  Login </Link>
              }

            </div>
          </div>

        </div>
      </header>
    </div>
  );
};


