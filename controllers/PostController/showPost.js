const PostModel = require('../../models/PostModel')
const Posts = new PostModel()

module.exports = async(req, res, next) => {
    const id = req.params.id
    console.log(id)
    
    try {
        const post = await Posts.getPost(id)
        if(post._id){
            res.send({status: true, data: post})
        } else {
            res.status(404).send({status: false, message: 'Post not found'})
        }
    } catch (error) {
        res.status(404).send({status: false, message: 'Post not found'})
    }
    
}