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

export const DialogVideo = () => {

    return (
        <Dialog>
           
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