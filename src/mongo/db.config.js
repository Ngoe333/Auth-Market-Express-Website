import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODBCONNECT);
        console.log('connect succesfully !')
     
    } catch (error) {
        console.log(error.message)
        
    }
}

export default dbConnect;