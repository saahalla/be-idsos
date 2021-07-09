const UserModel = require('../../models/UserModel')
const Users = new UserModel()

module.exports = async(req, res, next) => {
    const {username, password} = req.body

    const login = await Users.login(username, password)
    console.log({login, body: req.body})
    if(login){
        res.send({status: true, data: login})
    }else{
        res.send({status: false, message: 'login error'})
    }
}
