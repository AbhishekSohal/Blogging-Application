const express = require('express');
const router = express.Router();
const { signupUser, signinUser } = require('../controllers/user');


router.get('/signin', (req, res) => {
    res.render('signin')
})
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', signupUser);
router.post('/signin', signinUser);

module.exports = router;
