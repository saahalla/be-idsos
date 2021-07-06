const FollowerModel = require('../../models/FollowModel')
const Followers = new FollowerModel()

module.exports = async(req, res, next) => {
    const id = req.params.id
    const followings = await Followers.getFollowing(id)

    if(followings.length > 0){
        res.send({status: true, data: followings})
    }else{
        res.send({status: false, error: followings})
    }
}