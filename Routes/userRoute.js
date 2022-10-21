const express = require("express");
const User = require('../Models/User');
const CustomException = require("../Utils/ExceptionHandler/CustomException");
const { tryCatch } = require("../Utils/ExceptionHandler/TryCatch");

const router = express.Router();

/* #region //^CREATE */
router.post('/addNew', tryCatch(async (req, res, next) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        status: req.body.status
    });
    //Return result
    const savedPost = await user.save()
    return res.status(200).json(savedPost);
}));
/* #endregion */

/* #region //*READ */
router.get('/getAll', tryCatch(async (req, res) => {
    const users = await User.find();
    //Throwing exceptions
    if (users.length === 0) throw new CustomException(404, 'No users found');
    //Return result
    return res.json(users)
}));
router.get('/getByEmail/:userEmail', tryCatch(async (req, res) => {
    const user = await User.find({ email: req.params.userEmail });
    //Throwing exceptions
    if (user.length === 0) throw new CustomException(404, `User with email ${req.params.userEmail} not found`);
    //Return result
    return res.status(200).json(user);
}));
/* #endregion */

/* #region //~UPDATE */
router.patch("/updateByEmail/:userEmail", tryCatch(async (req, res) => {
    const updatedUser = await User.replaceOne({ email: req.params.userEmail }, req.body);
    //Handle exceptions
    if (updatedUser.modifiedCount === 0) throw new CustomException(404, `No records was found by email ${req.params.userEmail}`);
    //Return result
    res.json(updatedUser);
}));
/* #endregion */

/* #region //!DELETE */
router.delete('/delete/:userEmail', tryCatch(async (req, res) => {
    const removedUser = await User.deleteOne({ email: req.params.userEmail });
    //Throwing exceptions
    if (removedUser.deletedCount === 0) throw new CustomException(404, `No records was found by email ${req.params.userEmail}`);
    //Return result
    return res.status(200).json({deletedCount: removedUser.deletedCount});
}));
/* #endregion */

module.exports = router;