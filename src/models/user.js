const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 16
    },
    username: {
        type: String,
        required: true,
        maxlength: 16
    },
    password: {
        type: String,
        required: true,
        maxlength: 64
    }, 
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;