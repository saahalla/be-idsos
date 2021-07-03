const { ObjectID } = require('mongodb');
const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    userId = req.query.userId;
    if(client.isConnected()){
        const db = client.db('idsos');
        const userPosts = await db.collection('posts').find({userId}).toArray();
        
        res.send({status: true, data: userPosts});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}