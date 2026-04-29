import dotenv from "dotenv";
import connectDB from "./config/database.js";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.error("Error starting the server:", error);
            throw error;
        });
         app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    }
   
    catch (error) {
        console.error("Error in startServer:", error);
        process.exit(1);
    }
};

startServer();