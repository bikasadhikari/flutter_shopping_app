const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return value.match(regex);
            },
            message: 'Email is not valid!',
        },
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'user',
    },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;