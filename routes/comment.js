const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { addComment } = require('../controllers/comment');


router.post('/comment/:blogId', addComment);

module.exports = router;

