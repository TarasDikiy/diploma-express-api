const express = require("express");
const Role = require('../Models/Role');
const CustomException = require("../Utils/ExceptionHandler/CustomException");
const { tryCatch } = require("../Utils/ExceptionHandler/TryCatch");

const router = express.Router();

/* #region //^CREATE */
router.post('/addNew', tryCatch(async (req, res, next) => {
    const role = new Role({
        role: req.body.role,
        functionName: req.body.functionName,
        permissions: {
            read: req.body.permissions.read,
            write: req.body.permissions.write,
            delete: req.body.permissions.delete
        }
    });
    //Return result
    const savedRole = await role.save()
    return res.status(200).json(savedRole);
}));
/* #endregion */

/* #region //*READ */
router.get('/getByName/:roleName', tryCatch(async (req, res) => {
    const roles = await Role.find({ role: req.params.roleName });
    //Throwing exceptions
    if (roles.length === 0) throw new CustomException(404, `No such role as ${req.params.roleName} exist`);
    //Return result
    return res.status(200).json(roles);
}));
router.get('/getByNameAndFunction/:roleName/:functionName', tryCatch(async (req, res) => {
    const roles = await Role.find({ role: req.params.roleName, functionName: req.params.functionName });
    //Throwing exceptions
    if (roles.length === 0) throw new CustomException(404, `No such role as ${req.params.roleName} exist for function ${req.params.functionName}`);
    //Return result
    return res.status(200).json(roles);
}));
/* #endregion */

/* #region //~UPDATE */
router.patch("/updateByNameAndFunction/:roleName/:functionName", tryCatch(async (req, res) => {
    const updatedRole = await Role.findOneAndUpdate(
        { role: req.params.role, functionName: req.params.functionName }, 
        req.body, 
        { new: true, runValidators: true, rawResult: true });
    //Throwing exceptions
    if (!updatedRole.lastErrorObject.updatedExisting) throw new CustomException(404, `No such role as ${req.params.roleName} exist for function ${req.params.functionName}`);
    //Return result
    res.status(200).json(updatedRole);
}));
/* #endregion */

/* #region //!DELETE */
router.delete('/delete/:roleName/:functionName', tryCatch(async (req, res) => {
    const removedRole = await Role.deleteOne({ role: req.params.roleName, functionName: req.params.functionName });
    //Throwing exceptions
    if (removedRole.deletedCount === 0) throw new CustomException(404, `No records was found by email ${req.params.userEmail} or function ${req.params.functionName}`);
    //Return result
    return res.status(200).json({deletedCount: removedRole.deletedCount});
}));
/* #endregion */

module.exports = router;