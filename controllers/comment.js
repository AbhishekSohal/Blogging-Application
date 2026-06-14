const express = require('express');
const Comment = require('../models/comment');


const addComment = async (req, res) => {
    const comment = await Comment.create({
        content: req.body.content,
        blogid: req.params.blogId,
        createdBy: req.user._id || req.user.id
    });
    return res.redirect(`/blog/${req.params.blogId}`); // redirect to the blog page after adding the comment
}

module.exports = {
    addComment
};