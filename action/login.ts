'use server'

import * as z from 'zod';
import { LoginSchema } from '../schemas';
import { AuthError } from 'next-auth';
import { signIn } from '../auth';
import { DEFAULT_LOGIN_REDIRECT } from '../route';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '../data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: 'Invalid Field'}
    }
    
    const { email, password}  = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return{error: 'Email dose not exist !'}
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        // This verified if user EMAIL is verified
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )


        return{success: 'Comfirmation email sent !'}
    }

    try {

        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        

    } catch ( error){
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return{ error: 'Invalid Credentials !'}
                default:
                    return{error: 'Something went Wrong !'}           
            }
        }
        throw error;      
    }
};