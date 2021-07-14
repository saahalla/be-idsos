const CommentModel = require('../../models/CommentModel')
const Comments = new CommentModel()

module.exports = async(req, res, next) => {
    const id = req.params.id
    console.log(id)
    
    try {
        const comment = await Comments.getComment(id)
        if(comment._id){
            res.send({status: true, data: comment})
        } else {
            res.status(404).send({status: false, message: 'Comment not found'})
        }
    } catch (error) {
        res.status(404).send({status: false, message: 'Comment not found'})
    }
    
}