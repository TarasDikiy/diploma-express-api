const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
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
    status: {
        type: String,
        required: true,
        default: 'Guest'
    }
});

module.exports = mongoose.model('User', UserSchema);