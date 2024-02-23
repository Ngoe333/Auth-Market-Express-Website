'use client';

import React from 'react'
import Link from 'next/link';
import { UserRole } from '@prisma/client';
import { useCurrentUser } from '../../../../hooks/use-current-user';
import { usePathname } from 'next/navigation';

function OrderPage() {
  const user = useCurrentUser();
  const path = usePathname();
  return (
    <div>
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
          </>
            
        )}
      </div>


    </div>
  )
}

export default OrderPage;

