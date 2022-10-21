class CustomException extends Error {
    constructor(statusCode, errorMessage) {
        super(errorMessage);
        this.code = statusCode;
    }
}

module.exports = CustomException;