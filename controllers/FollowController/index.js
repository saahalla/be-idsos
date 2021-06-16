const client = require('../../module/mongodb')
const bcrypt = require('bcrypt')

module.exports = async(req, res, next) => {
    console.log('follow')
    const userId = req.query.userId
    const followerId = req.query.followerId
    
    if(client.isConnected()){
        const db = client.db('idsos');
        const checkFollow = await db.collection('followers').find({userId: userId, followerId: followerId}).toArray()

        /* date */
        const date = new Date();
        createAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const insertData = {
            userId: userId,
            followerId: followerId,
            createAt: createAt,
            updateAt: createAt
        }
        if(checkFollow[0]) {
            res.send({status: false, msg: 'You are already follow this account'})
        }else {
            const follow = await db.collection('followers').insertOne(insertData)
            
            res.send({status: true, data: follow.ops});
        }
        
    }else{
        res.send({status: false, msg: 'error connection database'});
    }
}