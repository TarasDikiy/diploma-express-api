const express = require("express");
const CustomException = require("../Utils/ExceptionHandler/CustomException");
const { tryCatch } = require("../Utils/ExceptionHandler/TryCatch");

const router = express.Router();

/* #region //^REGISTER */
router.post('/register', tryCatch(async (req, res) => {

}));
/* #endregion */

/* #region //*AUTHORIZE */
router.get('/authorize', tryCatch(async (req, res) => {

}));
/* #endregion */

module.exports = router;