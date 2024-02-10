import {db} from '../../../lib/db'
export async function POST(req){
    const {name} = await req.json();
    if(!name){
        return Response.json('Category dosen"t exist !')
    }

    const newCategory = await db.category.create({
        data:{
            name
        }
    });

    return  Response.json(newCategory)
    
}

export async function GET(){
    return Response.json(
      await db.category.findMany()
         
    )
}