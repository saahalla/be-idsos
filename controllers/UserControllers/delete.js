const { ObjectID } = require('mongodb');
const client = require('../../module/mongodb')

module.exports = async(req, res, next) => {
    const id = req.params.id;
    console.log(id)
    if(client.isConnected()){
        const db = client.db('idsos');
        const deleteUser = await db.collection('users').deleteOne({'_id': ObjectID(id)})
        console.log({id: id, res: deleteUser})
        res.send({status: true, msg: 'User data has been deleted successfully', data: deleteUser});
    }else{
        res.send({status: 'false', msg: 'error connection database'});
    }
}