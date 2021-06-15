const mongoose = require('mongoose');
const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    if(client.isConnected()){
        const db = client.db('idsos');
        const users = await db.collection('users').find().toArray();
        
        res.send(users);
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}