const PostModel = require('../../models/PostModel')
const Posts = new PostModel()
const CommentModel = require('../../models/CommentModel')
const Comments = new CommentModel()
const UserModel = require('../../models/UserModel')
const Users = new UserModel()

module.exports = async(req, res, next) => {
    const id = req.params.id
    console.log(id)
    
    try {
        const post = await Posts.getPost(id)
        const comments = await Comments.getPostComments(id)
        // console.log(comments)
        /* variable result untuk menampung array sementara dari comment */
        var result = []
        if(comments.length > 0){
            for(let i=0; i < comments.length; i++){
                /* mendapatkan nama user dari idUser */
                let users = await Users.getUser(comments[i].userId)
                /* menambahkan field userName */
                let comment = {
                    _id: comments[i]._id,
                    userId: comments[i].userId,
                    postId: comments[i].postId,
                    comment: comments[i].comment,
                    likes: comments[i].likes,
                    createAt: comments[i].createAt,
                    updateAt: comments[i].updateAt,
                    userName: users.name
                }
                // comment.push({name: users.name})
                /* push comment ke array result */
                result.push(comment)
                // console.log({commentupd:comment['name']})
            }
        }
        console.log({result})
        if(post._id){
            res.send({status: true, data: post, comments: result})
        } else {
            res.status(404).send({status: false, message: 'Post not found'})
        }
    } catch (error) {
        res.status(404).send({status: false, message: 'Post not found'})
    }
    
}