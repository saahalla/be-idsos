const PostModel = require('../../models/PostModel')
const Posts = new PostModel()

module.exports = async(req, res, next) => {
    const id = req.params.id;
    
    const deletePost = await Posts.deletePost(id);

    console.log(deletePost);

    if(deletePost.deletedCount === 1){
        res.send({status: true, message: 'Post has been deleted', result: deletePost})
    }else{
        res.status(404).send({status: false, message: 'Post not found', result: deletePost})
    }

}