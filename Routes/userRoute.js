const express = require("express");
const User = require('../Models/User');

const router = express.Router();

/* #region //^CREATE */
router.post('/addNew', async (req, res) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.name
    });
    try {
        const savedPost = await user.save()
        res.json(savedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
});
/* #endregion */

/* #region //*READ */
router.get('/getAll', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json({ message: err });
    }
});
router.get('/getByEmail/:userEmail', async (req, res) => {
    try {
        const user = await User.find({ email: req.params.userEmail });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});
/* #endregion */

/* #region //~UPDATE */
router.patch("/updateByEmail/:userEmail", async (req, res) => {
    try {
        const updatedUser = await User.replaceOne({ email: req.params.userEmail }, req.body.userObject);
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
});
/* #endregion */

/* #region //!DELETE */
router.delete('/delete/:userEmail', async (req, res) => {
    try {
        const removedUser = await User.remove({ email: req.params.userEmail });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});
/* #endregion */

module.exports = router;