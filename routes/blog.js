const express = require('express');
const router = express.Router();
const { addBlog } = require('../controllers/blog');

router.get('/add', (req, res) => {
    res.render('addBlog',{
        user: req.user
    })
})

router.post('/',addBlog)

module.exports = router;

