const CommentModel = require('../../models/CommentModel')
const Comments = new CommentModel()

module.exports = async(req, res, next) => {
    const postId = req.params.postId
    console.log(postId)
    
    const comments = await Comments.getPostComments(postId)

    if(comments.length > 0){
        res.send({status: true, data: comments})
    } else {
        res.send({status: false, error: comments})
    }
    
}