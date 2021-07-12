const PostModel = require('../../models/PostModel')
const Posts = new PostModel()

module.exports = async(req, res, next) => {
    const userId = req.params.userId
    console.log(userId)
    
    const posts = await Posts.getUserPosts(userId)

    if(posts.length > 0){
        res.send({status: true, data: posts})
    } else {
        res.send({status: false, error: posts})
    }
    
}