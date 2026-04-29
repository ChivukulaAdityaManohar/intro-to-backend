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
        /*The app.on() method sets up an event listener for error events on the Express app

        If any error occurs during server operation, this callback function is 
        triggered It logs the error to the console and re-throws it so the 
        process can exit gracefully Think of it as a "watch for problems" 
        mechanism*/

        app.on("error", (error) => {
            console.error("Error starting the server:", error);
            throw error;
        });

        /*The app.listen() method starts the HTTP server and makes it listen for incoming requests 
        on a specific port process.env.PORT || 8000 - Uses the PORT from 
        .env file, or defaults to 8000 if not set.

    The callback function (with the console.log) runs once the server successfully starts
    This is how your Express app becomes accessible to clients (browsers, Postman, etc.)
    */
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