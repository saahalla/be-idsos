const CommentModel = require('../../models/CommentModel')
const Comments = new CommentModel()

module.exports = async(req, res, next) => {
    const id = req.params.id;
    
    const deleteComment = await Comments.deleteComment(id);

    console.log(deleteComment);

    if(deleteComment.deletedCount === 1){
        res.send({status: true, message: 'Comment has been deleted', result: deleteComment})
    }else{
        res.status(404).send({status: false, message: 'Comment not found', result: deleteComment})
    }

}