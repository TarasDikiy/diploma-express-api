const jwt = require("jsonwebtoken");
const CustomException = require("../ExceptionHandler/CustomException");

module.exports = (req, res, next) => {
    //Check for header
    const token = req.header('auth-token');
    if(!token) throw new CustomException(401, 'Access denied');
    //Verify token
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
    req.user.verified;
};

//^ Import this and add in the router method after path parameter