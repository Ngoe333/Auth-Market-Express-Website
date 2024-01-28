'use client';

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps{
    children?: React.ReactNode
};

export const  LogoutButton = ({
    children
}: LogoutButtonProps) => {
    const onClick = () => {
        signOut();
    }

    return (
        <span onClick={onClick} className= {cn(' bg-blue-600')}>
            {children}
        </span>
    )
}