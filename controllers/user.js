const express = require('express');
const User = require('../models/user');

const signupUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password });
    return res.redirect('/');

}

const signinUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('User not found');
    }
    try {
        const token = await user.comparePasswordandGenerateToken(password);
        if (!token) {
            return res.render('signin', { error: 'Invalid email or password' });
        }
        return res.cookie('token', token, { httpOnly: true }).redirect('/');
    } catch (error) {
        return res.render('signin', { error: 'Invalid email or password' });
    } 
}
module.exports = { signupUser, signinUser }