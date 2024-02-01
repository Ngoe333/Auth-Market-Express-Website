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
import { VideoIcon } from "../icons/video-icon";

export const DialogVideo = () => {

    return (
        <Dialog>

            <DialogTrigger asChild>
                <button className=" flex gap-4 text-black items-center bg-green-100 px-6 py-2 font-semibold rounded-full shadow-inner -mb-6">
                    Video <VideoIcon />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] h-[500px]">
                <DialogHeader>
                    <DialogTitle className=" text-center">How to Order</DialogTitle>
                </DialogHeader>
                <div className="">

                    <h3>Video ads</h3>

                </div>

            </DialogContent>
        </Dialog>
    )

}