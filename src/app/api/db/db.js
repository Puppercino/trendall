/*
Authors: Jordan Lyall, Trong Vinh Luu
*/

import mongoose from "mongoose";

const dbConnection = async () => {

    if (mongoose.connection.readyState >= 1) { return; }

    try {
        await mongoose.connect(process.env.DB_URI,
            {
                dbName: process.env.DB_NAME,
                user: process.env.DB_USER,
                pass: process.env.DB_PASS,
            });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;