const UserModel = require('../../models/UserModel')
const Users = new UserModel()

module.exports = async(req, res, next) => {
    const users = await Users.getAllData()
    // console.log(users)
    if(users.length > 0){
        res.send({status: true, data: users})
    } else {
        res.send({status: false, error: users})
    }
}