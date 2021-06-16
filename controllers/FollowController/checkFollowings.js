const { ObjectID } = require('mongodb');
const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    if(client.isConnected()){
        console.log(req.query)
        var id = req.params.id;
        console.log({id, id})
        const db = client.db('idsos');
        const dataFollowings = await db.collection('followers').find({'followerId': id}).toArray();
        var followers = []
        for(var i=0; i<dataFollowings.length; i++){
            fId = dataFollowings[i]['userId']
            qUser = await db.collection('users').find({'_id': ObjectID(fId)})
                                                .project({name: 1, username: 1})
                                                .toArray()
            console.log(qUser)
            followers.push(qUser)
        }
        
        res.send({status: true, data: followers, dataFollowings: dataFollowings});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}