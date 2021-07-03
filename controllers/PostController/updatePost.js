const client = require('../../module/mongodb')
const MainClass = require('../../class/main.class')
const PostClass = require('../../class/post.class')
const { ObjectID } = require('mongodb')
const Main = new MainClass()
const Post = new PostClass()


module.exports = async(req, res, next) => {
    console.log('add')
    const id = req.body.id;
    const postContent = req.body.postContent;
    const hashtag = Post.getHashtag(postContent);
    const updateAt = Main.getCreatioDate();

    const query = {$set: {postContent, hashtag, updateAt}};
    console.log(query)

    if(client.isConnected()){
        const db = client.db('idsos');
        
        const updatePost = await db.collection('posts').updateOne({_id: ObjectID(id)}, query)
        
        res.send({status: true, data: updatePost});
        
    }else{
        res.send({status: false, msg: 'error connection database'});
    }
}