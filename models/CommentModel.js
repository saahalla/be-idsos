const Mongoose = require('mongoose');
require('../module/mongoose_connections');

const commentSchema = new Mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    postId: {
        type: String,
        required: true
    }, 
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date, 
        default: Date.now
    },
    updateAt: {
        type: Date, 
        default: Date.now
    }
})
const Comment = Mongoose.model('Comment', commentSchema);

class commentModel{
    constructor(){

    }
    async getAllData() {
        try {
            const comments = await Comment.find();
            // console.log(comments)
            return comments

        } catch (error) {
            return error
        }
    }
    async getComment(id) {
        try {
            const comment = await Comment.findOne({_id: id})
            // console.log(comment)
            return comment
        } catch (error) {
            return error
        } 
    }
    async getPostComments(postId) {
        try {
            const comments = await Comment.find({postId})
            console.log({modeldata: comments})
            return comments
        } catch (error) {
            return error
        }
    }
    async updateComment(search, data) {
        try {
            const updateComment = await Comment.updateOne(search, data)
            console.log(updateComment)
            return updateComment
            
        } catch (error) {
            return error
        }
    }
    async createComment(data) {
        try {
            const createComment = await Comment.create(data)
            // console.log(createComment)
            return createComment
        } catch (error) {
            // console.log(error)
            return error
        }
    }
    async deleteComment(id){
        try {
            const deleteComment = await Comment.deleteOne({_id: id})
            console.log(deleteComment)

            return deleteComment
        } catch (error) {
            return error
        }
    }
}

module.exports = commentModel;