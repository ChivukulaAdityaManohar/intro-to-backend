import {User} from '../models/user.model.js';

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
            console.log(`User password: ${user.password} and provided password: ${password}`);
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