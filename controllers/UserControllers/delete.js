const UserModel = require('../../models/UserModel')
const Users = new UserModel()

module.exports = async(req, res, next) => {
    const id = req.params.id;
    
    const deleteUser = await Users.deleteUser(id);

    console.log(deleteUser);

    if(deleteUser.deletedCount === 1){
        res.send({status: true, message: 'user has been deleted', result: deleteUser})
    }else{
        res.status(404).send({status: false, message: 'user not found', result: deleteUser})
    }

    

}