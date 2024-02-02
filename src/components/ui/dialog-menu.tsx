'use client';


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link';
import { RightIcon } from "../icons/right-icon";

export const DialogMenus = () => {

    return (
        <Dialog>

            <DialogTrigger asChild>
                <button className=" flex gap-2 items-center text-white btc px-6 py-2 bg-green-500 rounded-full mt-6 font-semibold border shadow-md">
                    Explore <RightIcon />{" "}
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[200px] h-[320px]">
                <DialogHeader>
                    <DialogTitle className=" text-center text-black space-y-1 text-2xl">Please Login or Register to add order items !</DialogTitle>
                </DialogHeader>
                <div className="w-full h-full flex items-center justify-center gap-2">
                    <Link href='/login' className=" bg-slate-100 shadow-md rounded py-2 px-4">Login</Link>
                    <h3>or</h3>
                    <Link href='/register' className=" bg-slate-100 shadow-md rounded py-2 px-4">Register</Link>
                </div>

            </DialogContent>
        </Dialog>
    )

}