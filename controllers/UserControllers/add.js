const mongoose = require('mongoose');
const client = require('../../module/mongodb')
const bcrypt = require('bcrypt')

module.exports = async(req, res, next) => {
    console.log('add')
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    /* password hash */
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const db = mongoose.connection
    /* date */
    const date = new Date();
    createAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log({
        username: username,
        name: name,
        email: email,
        hashPassword: hashPassword,
        password: password,
        createAt: createAt,
    })
    const insertData = {
        username: username,
        name: name,
        email: email,
        hashPassword: hashPassword,
        password: password,
        createAt: createAt,
    }

    if(client.isConnected()){
        const db = client.db('idsos');
        const users = await db.collection('users').insertOne(insertData)
        
        res.send({status: true, data: users.ops});
    }else{
        res.send({status: false, msg: 'error connection database'});
    }
}