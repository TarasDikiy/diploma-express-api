const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: false,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxLength: 1024
    }
});

module.exports = mongoose.model('User', UserSchema);