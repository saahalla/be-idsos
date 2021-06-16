const client = require('../../module/mongodb')
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
const { query } = require('express');

module.exports = async(req, res, next) => {
    const action = req.body.action;
    var password = req.body.password;
    var username = req.body.username;
    var name = req.body.name;
    var email = req.body.email;
    var id = req.body.id;
    var query;
    /* date Update At */
    const date = new Date();
    const updateAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    if (action == 'updatePassword') query = {$set: {password: password, updateAt: updateAt}}
    if (action == 'updateUsername') query = {$set: {username: username, updateAt: updateAt}}
    if (action == 'updateName') query = {$set: {name: name, updateAt: updateAt}}
    if (action == 'updateEmail') query = {$set: {email: email, updateAt: updateAt}}

    if(client.isConnected()){
        const db = client.db('idsos');
        const checkUsername = await db.collection('users').find({username: username}).toArray()
        const checkEmail= await db.collection('users').find({email: email}).toArray()
        if(checkUsername[0]) {
            res.send({status: false, msg: 'The username is already in use'})
        }else if(checkEmail[0]) {
            res.send({status: false, msg: 'The email address is already in use'})
        }else {
            console.log({username: username, cek: checkUsername})
            const users = await db.collection('users').updateOne({'_id': ObjectID(id)}, query)
            
            res.send({status: true, data: users});
        }
        
    }else{
        res.send({status: false, msg: 'error connection database'});
    }
}