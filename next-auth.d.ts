import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    adresse: string;
    phoneNumber:string;
    // id: string
}

declare module 'next-auth'{
    interface Session {
        user: ExtendedUser;   
    } 
}


// declare module "next-auth/jwt" {
//     /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//     interface JWT {
//       /** OpenID ID Token */
//       token: string;
//     }
//   }