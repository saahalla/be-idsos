const Mongoose = require('mongoose');
require('../module/mongoose_connections');
const UserModel = require('./UserModel');
Users = new UserModel();

const followerSchema = new Mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    followerId : {
        type: String,
        required: true
    },
    createAt: {
        type: Date, 
        default: Date.now
    },
    updateAt: {
        type: Date, 
        default: Date.now
    }
})
const Follower = Mongoose.model('Follower', followerSchema);

class FollowerModel{
    constructor(){

    }
    async getAllData() {
        try {
            const follower = await Follower.find();
            
            return follower

        } catch (error) {
            return error
        }
    }
    async getFollower(id) {
        try {
            const follower = await Follower.find({userId: id}).select('followerId')
            let result = []
            for(let i=0; i<follower.length; i++){
                const user = await Users.getUser(follower[i]['followerId'])
                console.log(user)
                result.push({id: follower[i]['followerId'], username: user.username, name: user.name})
            }

            return result
        } catch (error) {
            return error
        }
        
    }
    async getFollowing(id) {
        try {
            const following = await Follower.find({followerId: id}).select('userId')
            
            let result = []
            for(let i=0; i<following.length; i++){
                const user = await Users.getUser(following[i]['userId'])
                console.log(user)
                result.push({id: following[i]['userId'], username: user.username, name: user.name})
            }

            return result
        } catch (error) {
            return error
        }
        
    }
    async checkFollower(data) {
        try {
            const check = await Follower.find(data)
            return check
        } catch (error) {
            return error
        }
    }
    async createFollower(data) {
        try {
            const createFollower = await Follower.create(data)
            
            return createFollower
        } catch (error) {
            
            return error
        }
    }
    async deleteFollower(userId, followerId){
        try {
            const deleteFollower = await Follower.deleteOne({userId, followerId})
            
            return deleteFollower
        } catch (error) {
            return error
        }
    }
}

module.exports = FollowerModel;