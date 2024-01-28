import {v4 as uuidv4} from 'uuid';
import { getVerificationTokenByEmail } from '../../data/verification-token';
import { getPasswordResetTokenByEmail } from '../../data/password-reset-token';
import { getTowFactorTokenByEmail } from '../../action/two-factor-token';
import  crypto from 'crypto';
import { db } from './db';

export const generateTowFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expire = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTowFactorTokenByEmail(email);
    if(existingToken){
        await db.towFactorToken.delete({
            where: {id: existingToken.id}
        })
    }

    const towFactorToken = await db.towFactorToken.create({
        data: {
            email,
            token,
            expire
        }
    })

    return towFactorToken;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expire = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);
     if(existingToken){
        await db.passwordResetToken.delete({
            where: {id: existingToken.id}
        });
     }

     const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expire
        }
     })
     return passwordResetToken;
}


export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expire = new Date(new Date().getTime() + 3600 * 1000); 
                                            // Expire in 1h
    const existingToken = await getVerificationTokenByEmail(email);
     if (existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            },
        });
     } 
     
     const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expire
        }
     });

     return verificationToken;




}