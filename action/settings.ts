'use server';

import * as z from 'zod';
import { db } from "@/lib/db";
import { getUserById } from "../data/user";
import { currentUser } from '@/lib/auth'; 
import { SettingsSchema } from "../schemas";


export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
    if(!user) return {error: 'Unauthorized'};


     const dbUser = await getUserById(user.id as string);
     if(!dbUser) return {error: 'Unauthorized'};

     await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values,
        }
     });


     return {success: 'Settings updated!'}

}