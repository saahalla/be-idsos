const UserModel = require('../../models/UserModel')
const Users = new UserModel()

module.exports = async(req, res, next) => {
    console.log(req.params)
    var id = req.params.id;

    try {
        showUser = await Users.getUser(id)
        console.log({showUser})

        if(showUser._id){
            res.send({status: true, data: showUser})
        }else{
            res.status(404).send({status: false, message: `User not found`})
        }
        
    } catch (error) {
        res.status(404).send({status: false, message: `User not found`})
    }

    
}