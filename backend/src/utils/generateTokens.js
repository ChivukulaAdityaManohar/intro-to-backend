import jwt from "jsonwebtoken";


// ACCESS TOKEN
const generateAccessToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: "1m"
        }
    );
};


// REFRESH TOKEN
const generateRefreshToken = (user) => {

    return jwt.sign(
        {
            id: user._id
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: "7d"
        }
    );
};

export {
    generateAccessToken,
    generateRefreshToken
};