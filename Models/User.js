const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: false,
        trim: true,
        minlength: 5
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    surname: {
        type: String,
        required: false,
        default: ''
    },
    role: {
        type: String,
        required: true,
        default: 'Guest'
    }
});

module.exports = mongoose.model('User', UserSchema);