import {User} from '../models/user.model.js';


/*
Yes, exactly! When the router passes the request to registerUser, 
Express automatically passes both req and res.

How It Works
In user.route.js:


router.route("/register").post(registerUser);
This tells Express: "When a POST request comes to /register, call the registerUser function"

Express automatically calls it like:


registerUser(req, res)
What Are req and res?
What Are req and res?
req (Request object):

Contains all the data from the incoming request
req.body - Data sent in request body (username, email, password)
req.method - HTTP method (POST, GET, etc.)
req.originalUrl - The full path
res (Response object):

Used to send a response back to the client
res.status(201) - Set HTTP status code
What Are req and res?
req (Request object):

Contains all the data from the incoming request
req.body - Data sent in request body (username, email, password)
req.method - HTTP method (POST, GET, etc.)
req.originalUrl - The full path
res (Response object):

Used to send a response back to the client
res.status(201) - Set HTTP status code
Complete Flow:

1. Postman sends: POST /api/v1/users/register + {username, email, password}
   ↓
2. Request arrives at server (app.listen())
   ↓
3. Router matches the path and calls: registerUser(req, res)
   ↓
4. registerUser accesses req.body to get {username, email, password}
   ↓
5. registerUser uses res.status(201).json() to send response back

 POST will NOT be called if a PATCH request comes to /register.
 in user.route.js router.route("/register").post(registerUser);
 This says: "Only handle POST requests at /register"
 Express matches both the path AND the HTTP method. 
 If either doesn't match, the route handler is NOT called.
 If you send a PATCH request from Postman to /api/v1/users/register, you'll 
 get an error response like: 405 Method Not Allowed
 Because the route only accepts POST, not PATCH.

router.route("/create").post(createPost);           // Only POST
router.route("/getPosts").get(getposts);           // Only GET
router.route("/update/:id").patch(updatePost);     // Only PATCH
router.route("/delete/:id").delete(deletePost);    // Only DELETE
Each route explicitly specifies which HTTP method it accepts.
 If the wrong method is used, it won't be called.
*/


/*async makes a function asynchronous, 
meaning it can use the await keyword and works with Promises.

In Code :
const registerUser = async (req, res) => {
    const user = await User.create({...});  // ← await can only be used in async functions
    // ...
};
What Does async Do?
Allows await keyword - Without async, you can't use await
Returns a Promise - An async function always returns a Promise
Non-blocking - The function can pause and wait for long operations (database, network calls) without freezing the server
Without async - This Would Fail ❌
const registerUser = (req, res) => {
    const user = await User.create({...});  // ❌ SyntaxError: await outside async function
};
With async - This Works ✅
const registerUser = async (req, res) => {
    const user = await User.create({...});  // ✅ Works!
};

Why You Need It in Your Backend
Your controller functions do database operations:

await User.findOne() - Queries the database (takes time)
await User.create() - Saves to database (takes time)
await user.comparePassword() - Checks password (takes time)
Without async, the server would freeze while waiting for these operations.
With async/await, the server can handle other requests while waiting for 
the database response.


for all the requests from code to the database, we need to use await to 
ensure that our server remains responsive and can handle multiple requests 
concurrently without blocking the event loop.
For using await in our controller functions, we need to declare them
as async functions.
*/
const registerUser = async (req, res) => {
    try {
        const {username, email , password} = req.body;
        
        if(!username || !email || !password) {
            return res.status(400).json({error: "All fields are required"});
        }
        
        // Check if the user already exists
        const existingUser = await User.findOne( {email : email.toLowerCase()} );

        if (existingUser) {
            return res.status(400).json({error: "User already exists"});
        }

        // Create a new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn : false
        });
        res.status(201).json({
            message: "User registered successfully", 
            user : {
                id : user._id,
                email : user.email,
                username : user.username,

            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
            });
    }
};


const loginUser = async (req, res) => {
    try {
        //checking if the user already exists
        const {email, password} = req.body;
        
        const user = await User.findOne({
            email : email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({message: "User not found" });
        }
        //compare the password        
     const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log(`Invalid credentials ${email} ${password}`);
            //console.log(`User password: ${user.password} and provided password: ${password}`);
            return res.status(400).json({message: `Invalid credentials ${email} ${password}` });
        }

        //if the password is correct, we will set the loggedIn field to true
        res.status(200).json({
            message: "User logged in successfully",
            user : {
                id : user._id,
                email : user.email,
                username : user.username
            }
        });
    }
    
    catch (error) {
    res.status(500).json({
        message: "Internal server error",
        });
    }

}


const logoutUser = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email : email.toLowerCase()});
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutUser
};