'use server';

import * as z from 'zod';
import { db } from "@/lib/db";
import { getUserById } from "../data/user";
import { UseCurrentUser } from "../hooks/use-current-user";
import { SettingSchema } from "../schemas";


export const settings = async (values: z.infer<typeof SettingSchema>) => {
    const user =  UseCurrentUser();
    if(!user) return {error: 'Unauthorized'};


     const dbUser = await getUserById(user.id as string);
     if(!dbUser) return {error: 'Unauthorized'};

     await db.user.update({
        where: {id: dbUser.id}
        data: {
            ...values,
        }
     });

}