'use server'

import * as z from 'zod';
import { RegisterSchema } from '../schemas';
import bcrypt from 'bcrypt';
import db from '@/mongo/db.config';
import User from '@/models/user';


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedField = RegisterSchema.safeParse(values);
    if(!validatedField.success){
        return { error: 'Invalid Field'}
    }

    const {name, email, password, } = validatedField.data;
    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.


    
    return { success: 'Email send'};

};