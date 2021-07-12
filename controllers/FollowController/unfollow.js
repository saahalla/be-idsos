const FollowerModel = require('../../models/FollowModel')
const Followers = new FollowerModel()

module.exports = async(req, res, next) => {
    const {userId, followerId} = req.body
    /* validasi userId dan followerId harus terdaftar */

    const unfollow = await Followers.deleteFollower(userId, followerId)
    console.log({unfollow})
    
    if(unfollow.deletedCount === 1){
        res.send({status: true, message: 'unfollow success', data: unfollow})
    }else{
        res.send({status: false, message: 'unfollow error', error: unfollow})
    }
}