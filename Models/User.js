const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    surname: String
});

module.exports = mongoose.model('User', UserSchema);