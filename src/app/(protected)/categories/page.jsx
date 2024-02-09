import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function CategoriesPage() {
  const [newCategoriesName, setNewCategoriesName] = useState();
  const path = usePathname();

  function handleNewCategorieSubmit(event) {
    event.preventDefault();
        
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
              Meu Items
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
      </div>

      

      <div className=" mt-4">
        <form onsubmit={handleNewCategorieSubmit}>
          <div className=" flex flex-col gap-2 space-y-2 ">
            <div className="grow">
              <label>New categories</label>
              <input
                type="text"
                value={newCategoriesName}
                onChange={(event) => setNewCategoriesName(event.target.value)}
              />
            </div>

            <div>
              <button
                className=" border border-green-300 bg-slate-800 "
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CategoriesPage;
