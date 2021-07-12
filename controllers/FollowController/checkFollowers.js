const FollowerModel = require('../../models/FollowModel')
const Followers = new FollowerModel()

module.exports = async(req, res, next) => {
    const id = req.params.id
    const followers = await Followers.getFollower(id)

    if(followers.length > 0){
        res.send({status: true, data: followers})
    }else{
        res.send({status: false, error: followers})
    }
}