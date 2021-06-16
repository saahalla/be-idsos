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
        updateAt: createAt
    })
    const insertData = {
        username: username,
        name: name,
        email: email,
        password: hashPassword,
        createAt: createAt,
        updateAt: createAt
    }

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
            const users = await db.collection('users').insertOne(insertData)
            
            res.send({status: true, data: users.ops});
        }
        
    }else{
        res.send({status: false, msg: 'error connection database'});
    }
}