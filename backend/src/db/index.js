import mongoose from "mongoose"
import express from "express"
import { DB_NAME } from "../constants.js"




const connectDb = async () =>
{
    try {

        // console.log("MONGO URI:", process.env.MONGODB_URI);
        // console.log("Final URI:", `${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("URI:", process.env.MONGODB_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\n Mongodb Connected !! DB Host: ${connectionInstance.connection.host}`)
        // console.log("connectionInstance: " , connectionInstance)
    } catch (error) {
        console.log("Connection DB ERROR: " ,error )
        process.exit(1)
    }
}

export default connectDb