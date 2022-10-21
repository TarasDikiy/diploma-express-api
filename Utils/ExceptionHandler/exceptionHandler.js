const CustomException = require("./CustomException");

const exceptionHandler = (error, req, res, next) => {
    //Return error by type
    if (error.name === 'ValidationError') {
        return res.status(400).send({
            type: error.name,
            message: error.message
        });
    }
    if (error.name === "MongoServerError" && error.message.includes('duplicate')) {
        return res.status(400).send({
            type: 'Duplicate key error',
            invoked: error.keyValue
        });
    }
    //Return custom error
    if (error instanceof CustomException) {
        return res.status(error.code).send({
            status: error.code,
            message: error.message
        });
    }
    //Return default error
    return res.status(500).json({message: error.message || "Error"});
};

module.exports = exceptionHandler;