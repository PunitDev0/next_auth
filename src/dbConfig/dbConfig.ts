import mongoose from "mongoose";


export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('error',() => console.log("error"));
        connection.on('connected',() => console.log("connected"));
        connection.on('disconnected',() => console.log("disconnected"));
    }catch(error){
        console.log(error);
        
    }
}