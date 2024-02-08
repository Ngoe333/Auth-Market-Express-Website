'use server';

import * as z from 'zod';
import { db } from "@/lib/db";
import { getUserById } from "../data/user";
import { currentUser } from '@/lib/auth'; 
import { SettingsSchema } from "../schemas";

import { getUserByEmail } from '../data/user';


export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
    if(!user) return {error: 'Unauthorized'};


    // const userEmail = await getUserByEmail(user?.email as string)
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