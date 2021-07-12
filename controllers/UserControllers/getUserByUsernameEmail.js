const UserModel = require('../../models/UserModel')
const Users = new UserModel()

module.exports = async(req, res, next) => {
    console.log(req.query)
    const email = req.query.email;
    const username = req.query.username;

    if(email){
        var data = {email}
    }else{
        var data = {username}

    }
    console.log({data, ok:'ok'})

    try {
        showUser = await Users.getUserByEmailUsername(data)
        console.log({showUser})

        if(showUser._id){
            res.send({status: true, data: showUser})
        }else{
            res.status(404).send({status: false, message: `User not found`})
        }
        
    } catch (error) {
        console.error(error)
        res.status(404).send({status: false, message: `User not found`})
    }
    
}