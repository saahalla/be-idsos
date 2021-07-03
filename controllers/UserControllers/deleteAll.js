const client = require('../../module/mongodb')

module.exports = async(req, res, next)=>{
    if(client.isConnected()){
        const db = client.db('idsos');
        const deleteUser = await db.collection('users').deleteMany({})
        console.log({res: deleteUser})
        res.send({status: true, msg: 'User data has been deleted successfully', data: deleteUser});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}