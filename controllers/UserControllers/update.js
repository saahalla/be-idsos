const bcrypt = require('bcrypt')
const UserModel = require('../../models/UserModel')
const Users = new UserModel()

module.exports = async(req, res, next) => {
    console.log('ok')
    const {id, username, name, password, email} =  req.body
    const updateAt = new Date()
    console.log({cek: req.body, password})
    /* check password will be update ??? */
    if(password !== undefined && password !== '' && password !== null){
        /* password hash */
        const saltRounds = 10;
        var hashPassword = bcrypt.hashSync(password, saltRounds);
    }else{
        var hashPassword = null
    }
    /* --------------------------------- */

    const data = {username, name, password: hashPassword, email}

    for(key in data){
        // console.log(key)
        if (data[key] === undefined || data[key] === '' || data[key] === null) {
            delete data[key]
        }
    }

    const updateUser = await Users.updateUser({_id: id}, data)

    console.log({data, updateUser})

    if (updateUser.nModified === 1){
        updateUpdateAt = await Users.updateUser({_id: id}, {updateAt})
        const user = await Users.getUser(id)
        res.send({status: true, data: user, result: updateUser})
    }else{
        res.send({status: false, message: 'data can not be update', result: updateUser})
    }
    
}