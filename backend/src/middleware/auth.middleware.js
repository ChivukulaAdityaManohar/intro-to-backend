import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";


// VERIFY USER TOKEN
const verifyJWT = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const token = authHeader.split(" ")[1];

       const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken.id).select("-password");

        if(!user) {

            return res.status(401).json({
                message: "Invalid token"
            });
        }
    console.log("headers :" , req.headers.authorization);
        req.user = user;

        next();
    } catch(error) {

        return res.status(401).json({
            message: "Token expired or invalid"
        });
    }
};


// ROLE BASED AUTHORIZATION
const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        if(!roles.includes(req.user.role)) {

            return res.status(403).json({
                message: "Forbidden access"
            });
        }

        next();
    };
};

export {
    verifyJWT,
    authorizeRoles
};