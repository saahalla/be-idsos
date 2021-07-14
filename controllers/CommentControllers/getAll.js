const CommentModel = require('../../models/CommentModel')
const Comments = new CommentModel()

module.exports = async(req, res, next) => {
    const comments = await Comments.getAllData()
    // console.log(comments)
    if(comments.length > 0){
        res.send({status: true, data: comments})
    } else {
        res.send({status: false, error: comments})
    }
}