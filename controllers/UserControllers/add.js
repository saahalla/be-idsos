const bcrypt = require('bcrypt')
const UserModel = require('../../models/UserModel')
const Users = new UserModel()

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
    createAt = new Date()
    
    const insertData = {
        username,
        name,
        email,
        password: hashPassword,
        createAt,
        updateAt: createAt
    }
    console.log(insertData)

    const insert = await Users.createUser(insertData)
    
    console.log({insert})

    if(insert._id){
        res.send({status: true, data: insert})
    } else {
        res.send({status: false, error: insert})
    }
}