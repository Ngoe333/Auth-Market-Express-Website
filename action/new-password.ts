'use server';

import * as z from 'zod';
import { NewPasswordSchema } from '../schemas';
import { getPasswordResetTokenByToken } from '../data/password-reset-token';
import { getUserByEmail } from '../data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
    ) => {

    if(!token){
        return { error: 'Missing token!'}
    }
    
    const validatedField = NewPasswordSchema.safeParse(values);
     if(!validatedField.success) return{error: 'Invalid field!'};


     const { password} = validatedField.data;
     const existingToken = await getPasswordResetTokenByToken(token);
     if(!existingToken) return{ error: 'Invalid token!'};


     const hasExpired = new Date(existingToken.expire) < new Date();
     if(hasExpired) return{ error: 'Token has expired!'};


     const existingUser = await getUserByEmail(existingToken.email);
     if(!existingUser) return {error: 'Email deos not exist!'};


     const hasdedPassword =  await bcrypt.hash(password, 10);
     await db.user.update({
        where: {id: existingUser.id},
        data: {password: hasdedPassword}
     })

     await db.passwordResetToken.delete({
        where: {id: existingToken.id}
     })

     return { success: 'Password updated!'}






}