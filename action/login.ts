'use server'

import * as z from 'zod';
import { LoginSchema } from '../schemas';
import { AuthError } from 'next-auth';
import { signIn } from '../auth';
import { DEFAULT_LOGIN_REDIRECT } from '../route';
import { generateVerificationToken, generateTowFactorToken } from '@/lib/tokens';
import { getUserByEmail } from '../data/user';
import { sendVerificationEmail, sendTowFactorTokenEmail } from '@/lib/mail';
import { getTowFactorTokenByEmail } from '../data/two-factor-token';
import { getTowFactorComfirmationByUserId } from '../data/tow-factor-comfirmation';
import { db } from '@/lib/db';
export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl? : string | null,) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid Field' }
    }

    const { email, password, code } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Email dose not exist !' }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        // This verified if user EMAIL is verified
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )


        return { success: 'Comfirmation email sent !' }
    }

    if (existingUser.isTwoFactorEnable && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTowFactorTokenByEmail(
                existingUser.email
            );

            if (!twoFactorToken) {
                return { error: 'Invalid code!' }
            }

            if (twoFactorToken.token !== code) {
                return { error: 'Invalid code!' }
            }

            const hasExpired = new Date(twoFactorToken.expire) < new Date();

            if (hasExpired) {
                return { error: 'Code expired!' }
            }

            await db.towFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            const existingConfirmation = await getTowFactorComfirmationByUserId(
                existingUser.id
            )

            if (existingConfirmation) {
                await db.towFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await db.towFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            });

        }

        else {
            const twoFactorToken = await generateTowFactorToken(existingUser.email)
            await sendTowFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            );

            return { twoFactor: true };
        }
    }

    try {

        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })


    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Invalid Credentials !' }
                default:
                    return { error: 'Something went Wrong !' }
            }
        }
        throw error;
    }
};