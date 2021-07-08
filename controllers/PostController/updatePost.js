const PostModel = require('../../models/PostModel')
const Posts = new PostModel()

module.exports = async(req, res, next) => {
    const { id, userId, content } = req.body;
    const hashtag = Posts.getHashtag(content);
    const updateAt = new Date()

    const data = {userId, content, hashtag, updateAt};

    for(key in data){
        // console.log(key)
        if (data[key] === undefined || data[key] === '' || data[key] === null) {
            delete data[key]
        }
    }

    console.log({upd_reqBody: req.body, data})

    const update = await Posts.updatePost({_id: id}, data)
    console.log({update})
    
    if(update.nModified === 1){
        const post = await Posts.getPost(id)

        res.send({status: true, data: post, result : update})
    } else {
        res.send({status: false, message: 'post can not be update',result: update})
    }
}