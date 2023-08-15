const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkLogin = (req, res, next) => {
    
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access denied.");
        }
        const tokenCheck = token.replace('Bearer ', '')
        const decoded = jwt.verify(tokenCheck, process.env.SECRET_KEY);
        console.log(decoded)
        // req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

module.exports = checkLogin