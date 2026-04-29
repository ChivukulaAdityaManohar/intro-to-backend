import express from "express";
//Creates the main Express application instance.
const app = express();

//Enables the app to parse incoming JSON requests in the request body.
app.use(express.json());

// Logging middleware - logs all incoming requests
// app.use((req, res, next) => {
//     const timestamp = new Date().toISOString();
//     next();
// });

//routes import
//Imports route files that contain the actual endpoint definitions (like /register, /login, etc.).
import UserRouter from "./routes/user.route.js";
import PostRouter from "./routes/posts.route.js";

// routes declaration
/*This is where routing happens:

app.use() attaches routers to specific URL prefixes
Any request to /api/v1/users/* goes to the UserRouter
Any request to /api/v1/posts/* goes to the PostRouter
*/
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/posts", PostRouter);


//example route : http://localhost:4000/api/v1/users/register
export default app;


/*
Request comes in → app.use() checks the path
                ↓
    Path starts with /api/v1/users?  → Send to UserRouter
                ↓
    Path starts with /api/v1/posts?  → Send to PostRouter
                ↓
    Router files define specific endpoints (/register, /login, etc.)
    */


    /*1. index.js calls app.listen() 
   ↓
2. Server starts listening on port 8000
   ↓
3. Request comes to http://localhost:8000/api/v1/users/register
   ↓
4. Server (created by app.listen()) receives it
   ↓
5. Request goes through app.js middleware & routers
   ↓
6. Logging middleware logs: [timestamp] POST /api/v1/users/register
   ↓
7. Router matches path and calls the controller
*/