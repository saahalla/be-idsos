const UserModel = require('../../models/UserModel')
const Users = new UserModel()
const FollowModel = require('../../models/FollowModel')
const Follows = new FollowModel()

module.exports = async(req, res, next) => {
    console.log(req.params)
    const id = req.params.id;

    try {
        showUser = await Users.getUser(id)
        console.log({showUser})
        const followers = await Follows.getFollower(id)
        const followings = await Follows.getFollowing(id)
        const follow = {
            count: {
                followings: followings.length,
                followers: followers.length
            }
        }

        if(showUser._id){
            res.send({status: true, data: showUser, follow})
        }else{
            res.status(404).send({status: false, message: `User not found`})
        }
        
    } catch (error) {
        res.status(404).send({status: false, message: `User not found`})
    }
    
}