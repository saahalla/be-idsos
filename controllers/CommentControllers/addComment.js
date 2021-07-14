const CommentModel = require('../../models/CommentModel')
const Comments = new CommentModel()

module.exports = async(req, res, next) => {
    const { userId, postId, comment } = req.body;
    const createAt = new Date()

    const insertData = {userId, postId, comment};

    console.log({add_reqBody: req.body, insertData})

    const insert = await Comments.createComment(insertData)
    console.log({insert})
    
    if(insert._id){
        res.send({status: true, data: insert})
    } else {
        res.send({status: false, error: insert})
    }
}