import mongoose from "mongoose";

export const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected to the database ${conn.connection.host}`)
    } catch (error) {
        console.log("error connecting to the mogodb")
    }
}