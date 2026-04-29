import express from "express";

const app = express();


app.use(express.json());



//routes import
import UserRouter from "./routes/user.route.js";
import PostRouter from "./routes/posts.route.js";

// routes declaration
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/posts", PostRouter);


//example route : httsp://localhost:4000/api/v1/users/register
export default app;