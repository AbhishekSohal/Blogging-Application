const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { addBlog } = require('../controllers/blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = (req.user && (req.user._id || req.user.id)) ? (req.user._id || req.user.id) : 'anonymous';
        const uploadPath = path.resolve(`public/uploads/${userId}`);
        try {
            fs.mkdirSync(uploadPath, { recursive: true });
        } catch (err) {
            return cb(err);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });



router.get('/add', (req, res) => {
    res.render('addBlog',{
        user: req.user
    })
})


router.post('/', upload.single('cover'), addBlog)

module.exports = router;

