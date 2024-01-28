import { db } from "@/lib/db";

export const towFactorTokenByToken = async (token: string) => {
    try {

        const towFactorToken = await db.towFactorToken.findUnique({
            where: { token}
        })

        return towFactorToken;
        
    } catch{
        return null
        
    }
}


export const getTowFactorTokenByEmail = async (email: string) => {
    try {

        const getTowFactorTokenByEmail = await db.towFactorToken.findFirst({
            where: { email}
        })

        return getTowFactorTokenByEmail;
        
    } catch{
        return null
        
    }
}