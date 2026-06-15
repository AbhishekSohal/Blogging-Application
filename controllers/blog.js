const express = require('express');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const fs = require('fs');
const path = require('path');




const addBlog = async (req, res) => {
    const { title, content } = req.body
    if (!req.user) {
        return res.redirect('/user/signin');
    }

    const userId = req.user._id || req.user.id;
    const coverImage = (req.file && req.file.filename) ? `/uploads/${userId}/${req.file.filename}` : undefined;

    const blog = await Blog.create({
        content,
        title,
        createdBy: req.user._id,
        ...(coverImage && { coverImageURL: coverImage })
    })

    return res.redirect(`/blog/${blog._id}`)

}

const editBlogPage = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    if (blog.createdBy.toString() !== (req.user._id || req.user.id).toString()) {
        return res.status(403).send('Unauthorized: You are not the creator of this blog');
    }
    return res.render('editBlog', {
        user: req.user,
        blog: blog
    });
}


const updateBlog = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin')
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).send('Blog not found')
    }
    if (blog.createdBy.toString() !== (req.user._id || req.user.id).toString()) {
        return res.status(403).send('Unauthorized: You are not the creator of this blog');
    }
    const { title, content } = req.body;
    blog.title = title;
    blog.content = content;
    // if new cover image is uploaded , delete the old cover image
    if (req.file) {
        const userId = req.user._id || req.user.id;
        if (blog.coverImageURL && !blog.coverImageURL.startsWith('/images/default.png')) {
            const oldImagePath = path.join(__dirname, '../public', blog.coverImageURL);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error('Failed to delete old cover image:', err);
            });
        }
        blog.coverImageURL = `/uploads/${userId}/${req.file.filename}`;
    }

    await blog.save();
    return res.redirect(`/blog/${blog._id}`);
}
const deleteBlog = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    if (blog.createdBy.toString() !== (req.user._id || req.user.id).toString()) {
        return res.status(403).send('Unauthorized: You are not the creator of this blog');
    }

    // Delete cover image if it exists and is not default
    if (blog.coverImageURL && !blog.coverImageURL.startsWith('/images/default.png')) {
        const imagePath = path.join(__dirname, '../public', blog.coverImageURL);
        fs.unlink(imagePath, (err) => {
            if (err) console.error('Failed to delete cover image:', err);
        });
    }

    // Delete associated comments
    await Comment.deleteMany({ blogid: blog._id });

    // Delete the blog
    await Blog.findByIdAndDelete(blog._id);

    return res.redirect('/');
};


module.exports = {
    addBlog,
    editBlogPage,
    updateBlog,
    deleteBlog
};