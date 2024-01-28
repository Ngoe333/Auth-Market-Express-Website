import { db } from "@/lib/db";

export const getTowFactorComfirmationByUserId = async ( userId : string) => {
    try {

        const towFactorComfirmation = await db.towFactorConfirmation.findUnique({
            where: {userId}
        })

        return towFactorComfirmation;
        
    } catch{
        return null
        
    }
}