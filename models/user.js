const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateToken } = require('../services/authentication');
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePictureURL: {
        type: String,
        default: '/images/default.png'

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

}, { timestamps: true });

userSchema.pre('save', async function () {// 'this' refers to the user document being saved to the database also it is being given to this function as an argument from function in controllers/user.js
    const user = this;
    // if the password field has not been modified, we can skip hashing
    if (!user.isModified('password')) {
        return;
    }

    // if the password field has been modified, hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});
// this method will be used to compare a candidate password with the hashed password stored in the database
userSchema.methods.comparePasswordandGenerateToken = async function (candidatePassword) {
    const user = this;
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    if (!isMatch) {
        return null;
    }

    const token = generateToken(user);
    return token;
};

const User = mongoose.model('user', userSchema);

module.exports = User;

