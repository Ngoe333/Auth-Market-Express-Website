'use server'

import * as z from 'zod';
import { RegisterSchema } from '../schemas';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '../data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
   

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedField = RegisterSchema.safeParse(values);
    if(!validatedField.success){
        return { error: 'Invalid Field'}
    }

    const {name, email, password } = validatedField.data;
    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)
       

    if (existingUser){
        return {error: "Email already use"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password : hashPassword,     
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    ) 

    // : Todo send verification token email
    
    return { success: 'Comfirmation email send !'};

};