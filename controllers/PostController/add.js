const client = require('../../module/mongodb')
const MainClass = require('../../class/main.class')
const PostClass = require('../../class/post.class')
const Main = new MainClass()
const Post = new PostClass()


module.exports = async(req, res, next) => {
    console.log('add')
    const userId = req.body.userId;
    const postContent = req.body.postContent;
    const hashtag = Post.getHashtag(postContent);
    const createAt = Main.getCreatioDate();

    const insertData = {userId, postContent, hashtag, createAt, updateAt: createAt};

    console.log(insertData)

    if(client.isConnected()){
        const db = client.db('idsos');
        
        // console.log({username: username, cek: checkUsername})
        const posts = await db.collection('posts').insertOne(insertData)
        
        res.send({status: true, data: posts.ops});
        
    }else{
        res.send({status: false, msg: 'error connection database'});
    }
}