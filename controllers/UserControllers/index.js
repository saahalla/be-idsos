const UserModel = require('../../models/UserModel')
const Users = new UserModel()
const FollowModel = require('../../models/FollowModel')
const Follows = new FollowModel()

module.exports = async(req, res, next) => {
    const users = await Users.getAllData()
    // besok coba belajar populate, coba native dulu :)
    let result = []
    for(let i=0; i < users.length; i++){
        let followers = await Follows.getFollower(users[i]._id)
        let followings = await Follows.getFollowing(users[i]._id)
        let countFollow = {
            followers: followers.length,
            followings: followings.length
        }

        let user = {
            _id: users[i]._id,
            username: users[i].username,
            name: users[i].name,
            email: users[i].email,
            password: users[i].password,
            role: users[i].role,
            followers,
            followings,
            countFollow,
            createAt: users[i].createAt,
            updateAt: users[i].updateAt,
        }
        result.push(user)
    }

    console.log(users)
    console.log({result})
    if(users.length > 0){
        res.send({status: true, data: result})
    } else {
        res.send({status: false, error: users})
    }
}