import mongoose from "mongoose";//to connect to the database and use the connection in the server


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);//exit the process with failure code bec success code is 0 and failure code is 1
    }
};