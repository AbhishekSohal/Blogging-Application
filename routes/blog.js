const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Blog = require('../models/blog');
const { addBlog, editBlogPage, updateBlog, deleteBlog } = require('../controllers/blog');
const Comment = require('../models/comment');

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
    res.render('addBlog', {
        user: req.user
    })
})
router.post('/', upload.single('cover'), addBlog)

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    const comments = await Comment.find({ blogid: req.params.id }).populate('createdBy');
    return res.render('blog', {
        user: req.user,
        blog: blog,
        comments: comments
    })
})





router.get('/edit/:id', editBlogPage);
router.post('/edit/:id', upload.single('cover'), updateBlog);

router.post('/delete/:id', deleteBlog);




module.exports = router;

