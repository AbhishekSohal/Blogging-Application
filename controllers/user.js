const express = require('express');
const User = require('../models/user');

const signupUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password });
    res.redirect('/');

}

const signinUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).send('Invalid email or password');
    }

    res.redirect('/');
}
module.exports = { signupUser, signinUser }