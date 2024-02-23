import { db } from '../../../lib/db'



export async function POST(req) {
    try {
        const { image, name, description, basePrice } = await req.json();
        const dataMenuItems = await db.menuItems.create({
            data: {
                image,
                name,
                description,
                basePrice,
            }
        })
        return Response.json(dataMenuItems)


    } catch {
        return Response.json('Something went wrong!')

    }


};



export async function GET() {
    try {
        const dataMenuItems = await db.menuItems.findMany()
        return Response.json(dataMenuItems)


    } catch {
        return Response.json('Something went wrong!')

    }


};



export async function PUT(req) {

    try {

        const { id, image, name, description, basePrice } = await req.json();
        const updateMenuItems = await db.menuItems.findUnique({ where: { id } });
        await db.menuItems.update({
            where: {
                id: updateMenuItems.id,
            },

            data: {
                image,
                name,
                description,
                basePrice,

            }
        })

        return Response.json(true)

    } catch (error) {

        return Response.json('Something went wrong!').status(401)

    }


}