import { db } from "@/lib/db";


export const getCategoryById = async (id : string) => {
    try {
        const categoryProduct = await db.category.findUnique({where: { id }});
        return categoryProduct;     
    } catch {
        return null;
        
    }
}