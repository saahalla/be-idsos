const { ObjectID } = require('mongodb');
const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    if(client.isConnected()){
        console.log(req.query)
        var id = req.query.id;
        var username = req.query.username;

        query = id ? {'_id': ObjectID(id)} : {username: username}
        const db = client.db('idsos');
        const users = await db.collection('users').find(query).toArray();
        
        res.send({status: true, data: users});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}