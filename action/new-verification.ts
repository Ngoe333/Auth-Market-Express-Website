'use server';

import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user";
import { getVerificationTokenByToken } from "../data/verification-token";


export const newVerificationToken = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken){
        return {error: 'Token does not exist!'}
    }

    const hasExpired = new Date(existingToken.expire) < new Date();

    if(hasExpired){
        return {error: 'Token has expired!'}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error: 'Email does not exist!'}
    }

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    // Remove the all verification Token inside the DATABASE
    await db.verificationToken.delete({
        where: {id: existingToken.id}
    });

    return { success: 'Email verified'}

}