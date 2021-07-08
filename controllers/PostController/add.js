const PostModel = require('../../models/PostModel')
const Posts = new PostModel()

module.exports = async(req, res, next) => {
    const { userId, content } = req.body;
    const hashtag = Posts.getHashtag(content);
    const createAt = new Date()

    const insertData = {userId, content, hashtag, createAt, updateAt: createAt};

    console.log({add_reqBody: req.body, insertData})

    const insert = await Posts.createPost(insertData)
    console.log({insert})
    
    if(insert._id){
        res.send({status: true, data: insert})
    } else {
        res.send({status: false, error: insert})
    }
}