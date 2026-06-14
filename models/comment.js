const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    }
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;