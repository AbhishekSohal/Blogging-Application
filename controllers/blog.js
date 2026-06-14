const express = require('express');
const Blog = require('../models/blog');



const addBlog = async (req, res) => {
    const {title, content } = req.body
    if (!req.user){
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

module.exports = {
    addBlog
};