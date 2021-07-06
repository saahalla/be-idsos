const FollowerModel = require('../../models/FollowModel')
const Followers = new FollowerModel()

module.exports = async(req, res, next) => {
    followers = await Followers.getAllData()

    if(followers.length > 0){
        res.send({status: true, data: followers})
    }else{
        res.send({status: false, error: followers})
    }
}