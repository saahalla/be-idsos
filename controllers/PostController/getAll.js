const { ObjectID } = require('mongodb');
const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    if(client.isConnected()){
        const db = client.db('idsos');
        var userPosts = await db.collection('posts').find().toArray();
        var result = []
        for(var i=0; i<userPosts.length; i++){
            userId = userPosts[i].userId
            users = await db.collection('users').find({'_id': ObjectID(userId)}).toArray()
            console.log(users)
            // userPosts[i].push(users.username)
            result.push({
                post: userPosts[i],
                username: users[0].username
            })
        }
        
        
        
        res.send({status: true, data: result});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}