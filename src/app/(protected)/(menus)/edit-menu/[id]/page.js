"use client";

import React from "react";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "../../../../../../hooks/use-current-user";
import { useParams, usePathname } from "next/navigation";
import { EditableImage } from "../../../../../lib/editableImage";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";



export default function EditMenu() {
    const {id} = useParams
    const path = usePathname();
    const user = useCurrentUser();
    const route = useRouter();
    const session = useSession();
    const [image, setImage] = useState("");
    // const [ispending, setTransition] = useTransition();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState("");

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i.id === id);
                setImage(item?.image);
                setName(item?.name);
                setDescription(item?.description);
                setBasePrice(item?.basePrice);
            });
        });

    }, []);

    async function handleFormSubmit(event) {
        event.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch("api/menu-items", {
                method: "PUT",
                body: JSON.stringify({ image, name, description, basePrice, id:id }),
                headers: { "Content-Type": "application/json" },
            });

            // setTimeout(() => {
            //   setImage("");
            //   setName("");
            //   setDescription("");
            //   setBasePrice("");
            // }, 2000);

            if (response.ok) {
                resolve();
            } else {
                reject();
            }

            await toast.promise(savingPromise, {
                loading: "saving item menu",
                success: "Saved",
                error: "Error",
            });
        });

        //   setTimeout(() => {
        //     route.push('/menu-items')
        //   }, 3000);


    }

    // if (response.ok) {
    //   toast.success("Menu item created!");
    // } else {
    //   toast.error("Something went wrong in the code!");
    // }

    // const data = {image, name, description, basePrice}

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
            <div className="mt-8">
                <Link
                    className="flex  gap-2 justify-center items-center font-semibold"
                    href={"/menu-items"}
                >
                   
                    Show all menu items

                </Link>
            </div>

            <div className=" mt-12 ">
                {/* max-w-md */}
                <form onSubmit={handleFormSubmit} className="max-w-[200px] mx-auto">
                    <div className="flex gap-4 flex-col">
                        <div className="flex items-center justify-center flex-col space-y-2">
                            <EditableImage
                                className="w-[70px] h-[70px] rounded-md"
                                link={image}
                                setLink={setImage}
                            />
                        </div>

                        <div className="grow flex-col flex space-y-2 lg:w-8 ">
                            <label>Item name</label>
                            <input
                                type="text"
                                className="bg-gray-300 py-2 px-4 rounded-md"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                            <label>Description</label>
                            <input
                                type="text"
                                className="bg-gray-300 py-2 px-4 rounded-md focus: outline-none"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />

                            <label>Base price</label>
                            <input
                                type="text"
                                className="bg-gray-300 py-2 px-4 rounded-md"
                                value={basePrice}
                                onChange={(event) => setBasePrice(event.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className=" bg-green-500 text-md text-white font-semibold py-2 px-4 rounded-md mt-4 mx-auto"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
