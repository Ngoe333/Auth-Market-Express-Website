'use client';

import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {Button} from '@/components/ui/button';
import { toast } from 'sonner';

function CategoriesPage() {
  const [newCategoriesName, setNewCategoriesName] = useState();
  const [categories, setCategories] = useState([]);
  const path = usePathname();

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });

    });

  }, []);

  async function handleNewCategorieSubmit(event) {
    event.preventDefault();

    const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({name:newCategoriesName}),
    });

    if(response.ok){
        toast.success('Category create succesfully!')
    }

    else{
        toast.error('Somthing went wrong!')
    }
  }

  return (
    <section className=" max-w[500px] mt-24 flex mx-auto justify-center">
      <div className=" flex flex-wrap  space-y-2 gap-2 tags mx-auto justify-center">
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
        {UserRole.ADMIN && (
          <>
            <Link
              href={"/categories"}
              className={
                path === "/categories"
                  ? "bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              Categories
            </Link>
            <Link
              href={"/menu-items"}
              className={
                path === "/menu-items"
                  ? "bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              Menu Items
            </Link>
            <Link
              href={"/users"}
              className={
                path === "/users"
                  ? "bg-green-500 text-white rounded-full py-2 px-4 "
                  : "bg-gray-300 text-gray-700 rounded-full py-2 px-4 "
              }
            >
              Users
            </Link>
          </>
        )}

        <div className=" mt-6">
          <form onSubmit={handleNewCategorieSubmit}>
            <div className=" flex flex-col gap-2 space-y-2 items-center justify-center ">
              <div className="flex flex-col items-center justify-center space-y-3">
                <label className="text-center text-2xl font-semibold  mb-4">New category</label>
                <input
                  type="text" className=" rounded-md outline-none py-2 bg-slate-100 shadow-inner pl-4"
                  placeholder="Catogery"
                  value={newCategoriesName}
                  onChange={(event) => setNewCategoriesName(event.target.value)}
                />
              </div>

              <div>
                <Button
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </div>
          </form>

          <div>
            {categories.length > 0 && categories.map(c => (

              <div className="flex flex-col space-y-4 font-semibold" key={c.toString()}>{c.name}</div>

            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;
