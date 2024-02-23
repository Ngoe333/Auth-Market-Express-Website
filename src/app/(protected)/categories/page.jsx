"use client";

import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCurrentUser } from "../../../../hooks/use-current-user";

function CategoriesPage() {
  const [categoriesName, setCategoriesName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const path = usePathname();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  };

  const data = { name: categoriesName };
  if (editedCategory) {
    data.id = editedCategory.id;
    // toast.success('Category edited!')
  }


  
  async function handleCategorieSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/categories", {
      method: editedCategory ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setCategoriesName("");
    fetchCategory();
    setEditedCategory(null);

    if (response.ok) {
      toast.success("Category create succesfully!");
    } else {
      toast.error("Somthing went wrong!");
    }
  }

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

      <div className=" mt-4  ">
        <form onSubmit={handleCategorieSubmit} className="max-w-md max-auto">
          <div className=" flex flex-col gap-2 space-y-2 items-center justify-center ">
            <div className="flex flex-col items-center justify-center space-y-3">
              <label className="text-center text-2xl font-semibold  mb-4 text-gray-500">
                {editedCategory ? "Update category" : "New category name"}
                {editedCategory && (
                  <>
                    {" "}
                    : <b> {editedCategory.name} </b>{" "}
                  </>
                )}
              </label>
              <div className="grow">
                <input
                  type="text"
                  className=" rounded-md outline-none py-2 bg-slate-100 shadow-inner pl-4"
                  placeholder="Catogery"
                  disabled={isPending}
                  value={categoriesName}
                  onChange={event => setCategoriesName(event.target.value)}
                />
              </div>
            </div>

            <div>
              <button className=" bg-green-400 px-8 py-2 rounded-md text-white font-semibold">
              {editedCategory ? "update" : "Create"}
              </button>
            </div>
          </div>
        </form>

          <h3 className="mt-8 text-sm text-gray-500">Edit category:</h3>
        <div className=" flex flex-wrap items-center justify-center text-center gap-2 md:">
          {categories.length > 0 &&
            categories.map((c, index) => (
              <div
                onClick={() => {
                  setEditedCategory(c);
                  setCategoriesName(c.name);
                }}
                className="bg-slate-200 rounded-xl py-4 w-[250px] px-4 gap-1 mb-2 cursor-pointer "
                key={index}
              >
                {c.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
