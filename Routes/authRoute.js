const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const CustomException = require("../Utils/ExceptionHandler/CustomException");
const { tryCatch } = require("../Utils/ExceptionHandler/TryCatch");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* #region //^REGISTER */
router.post('/register', tryCatch(async (req, res) => {
    //Password encoding
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //Creating user object
    const user = new User({
        email: req.body.email,
        password: hashPassword
    });
    //Saving user
    const savedUser = await user.save();
    //Return result
    return res.status(200).json({message: 'User register successful'});
}));
/* #endregion */

/* #region //*AUTHORIZE */
router.get('/authorize', tryCatch(async (req, res) => {
    //Check email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new CustomException(404, `User with email ${req.body.email} not found`);
    //Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) throw new CustomException(404, 'Wrong password');
    //Creating token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    //Return result
    return res.status(200).json({message: 'Login successful', token: token});
}));
/* #endregion */

module.exports = router;

//TODO Relocate password encoding to User model as pre-save hook