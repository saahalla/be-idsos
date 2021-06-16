const { ObjectID } = require('mongodb');
const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    if(client.isConnected()){
        console.log(req.query)
        var id = req.params.id;
        console.log({id, id})
        const db = client.db('idsos');
        const dataFollowers = await db.collection('followers').find({'userId': id}).toArray();
        var followers = []
        for(var i=0; i<dataFollowers.length; i++){
            fId = dataFollowers[i]['followerId']
            qUser = await db.collection('users').find({'_id': ObjectID(fId)})
                                                .project({name: 1, username: 1})
                                                .toArray()
            console.log(qUser)
            followers.push(qUser)
        }
        
        res.send({status: true, data: followers, dataFollowers: dataFollowers});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}