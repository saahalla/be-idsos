const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    if(client.isConnected()){
        const db = client.db('idsos');
        const follows = await db.collection('followers').find().toArray();
        
        res.send({status: true, data: follows});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}