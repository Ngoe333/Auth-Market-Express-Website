
import { db } from '../../../lib/db'
import { getCategoryById } from '../../../../data/category';

export async function POST(req) {
    const { name } = await req.json();
    if (!name) {
        return Response.json('Category dosen"t exist !')
    }

    const newCategory = await db.category.create({
        data: {
            name
        }
    });

    return Response.json(newCategory)

}

export async function GET() {
    try {
        const allCategory = await db.category.findMany()

        return Response.json(allCategory)
        
    } catch {
        return Response.json('ooup something went wrong !')
        
    }
    
}

// const c = await db.category.GET


export async function PUT(req) {
    const { id, name } = await req.json();
    const categoryProduct = await db.category.findUnique({ where: { id } });
    await db.category.update({
        where: {
            id: categoryProduct.id,
        },

        data: {
            name
        }
    })

    return Response.json(true)

}