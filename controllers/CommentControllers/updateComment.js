const CommentModel = require('../../models/CommentModel')
const Comments = new CommentModel()

module.exports = async(req, res, next) => {
    const { id, comment, likes } = req.body;
    const updateAt = new Date()

    const data = {comment, likes, updateAt};

    for(key in data){
        // console.log(key)
        if (data[key] === undefined || data[key] === '' || data[key] === null) {
            delete data[key]
        }
    }

    console.log({upd_reqBody: req.body, data})

    const update = await Comments.updateComment({_id: id}, data)
    console.log({update})
    
    if(update.nModified === 1){
        const comment = await Comments.getComment(id)

        res.send({status: true, data: comment, result : update})
    } else {
        res.send({status: false, message: 'comment can not be update',result: update})
    }
}