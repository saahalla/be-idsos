const FollowerModel = require('../../models/FollowModel')
const Followers = new FollowerModel()

module.exports = async(req, res, next) => {
    const {userId, followerId} = req.body
    /* validasi userId dan followerId harus terdaftar */

    createAt = new Date()

    const data = {
        userId,
        followerId,
        createAt,
        updateAt: createAt
    }
    const checkFollow = await Followers.checkFollower({userId, followerId})

    if(checkFollow.length > 0){
        console.log({checkFollow})
        res.status(403).send({status: false, message: "You are already follow this account"})
    }else {
        const Follow = await Followers.createFollower(data)
        console.log(Follow)

        res.send({status: true, data: Follow})
    }

    
}