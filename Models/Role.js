const { default: mongoose } = require("mongoose");

const RoleSchema = mongoose.Schema({
    role: {
        type: String,
        unique: false,
        minlength: 1,
        trim: true
    },
    functionName: {
        type: String,
        unique: false,
        minlength: 1,
        trim: true
    },
    permissions: {
        read: {
            type: Boolean,
            required: true
        },
        write: {
            type: Boolean,
            required: true
        },
        delete: {
            type: Boolean,
            required: true
        }
    }
});

module.exports = mongoose.model('Role', RoleSchema);