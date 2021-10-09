const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Unique email for each user
    },
    address: {
        type: String
    },
    role: { // Role of user it will be (0: user, 1: admin)
        type: Number,
        default: 0
    },
    phone: { type: String },
});

module.exports = User = mongoose.model('User', UserSchema);