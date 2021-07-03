const client = require('../../module/mongodb')
const bcrypt = require('bcrypt')
const MainClass = require('../../class/main.class')
const Main = new MainClass();

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
    createAt = Main.getCreatioDate()
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
        username,
        name,
        email,
        password: hashPassword,
        createAt,
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