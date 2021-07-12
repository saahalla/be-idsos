const PostModel = require('../../models/PostModel')
const Posts = new PostModel()

module.exports = async(req, res, next) => {
    const posts = await Posts.getAllData()
    // console.log(posts)
    if(posts.length > 0){
        res.send({status: true, data: posts})
    } else {
        res.send({status: false, error: posts})
    }
}