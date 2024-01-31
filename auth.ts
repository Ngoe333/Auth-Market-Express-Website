import NextAuth, { Session, User } from "next-auth"
import authConfig from "./auth.config"
import { UserRole } from "@prisma/client";
import {PrismaAdapter} from '@auth/prisma-adapter';
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { getTowFactorComfirmationByUserId } from "./data/tow-factor-comfirmation"
import { getAccountByUserId } from "./data/account";






export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({

    // This for when a user signin with a OAUTH provider like google and when to signin AGAIN with the same EMAIL using facebook
    pages :{
        signIn: '/login',
        error: '/error'

    },


    // When a user sign in with a provider like google or facebook we're making verified automatically because we trus the providers
    events : {
        async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },

    //  Callback is use for get more information when user signin or signout using the TOKEN and SESSION
    callbacks:{
        async signIn({user, account}){

            // Allow OAuth without email verification
            if (account?.provider !== 'credentials') return true;
            
            const existingUser = await getUserById(user.id as any);

            // prevent sigin without email verification
            if(!existingUser?.emailVerified) return false;

            if(existingUser.isTwoFactorEnable) {
                const twoFactorConfirmation = await getTowFactorComfirmationByUserId(existingUser.id)

                if(!twoFactorConfirmation) return false;

                    // This code delete the 2FA went the USER login || next time the login their we be ask 2FA again
                await db.towFactorConfirmation.delete({
                    where: {id: twoFactorConfirmation.id}
                });

            }

            return true
        },

        async session({ token, session }: {session: Session, user?: User, token?: any}){
            // console.log({SessionToken: token})

            if(token.sub && session.user){
                session.user.id = token.sub
            }

            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }

            if(session.user){
                session.user.isTwoFactorEnabled =  token.isTwoFactorEnabled;
            }

            if(session.user){
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isOAuth = token.isOAuth as boolean;
            }
            return session;
        },

        async jwt({ token}){
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser) return token;

            const existingAccount = await getAccountByUserId(
                existingUser.id
            );

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.adresse = existingUser.adresse;
            token.phone = existingUser.phoneNumber;
            token.role = existingUser.role;
            return token;
        }

    },
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    ...authConfig,

});