const Mongoose = require('mongoose');
require('../module/mongoose_connections');

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        unique: true
    }, 
    email: {
        type: String,
        validate: {
            validator: function(v){
                return /^\S+@\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    }, 
    password: {
        type: String,
        required: true,
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
const User = Mongoose.model('User', userSchema);

class UserModel{
    constructor(){

    }
    async getAllData() {
        try {
            const users = await User.find();
            // console.log(users)
            return users

        } catch (error) {
            return error
        }
    }
    async getUser(id) {
        try {
            const user = await User.findOne({_id: id})
            // console.log(user)
            return user
        } catch (error) {
            return error
        }
        
    }
    async updateUser(search, data) {
        try {
            const updateUser = await User.updateOne(search, data)
            console.log(updateUser)
            return updateUser
            
        } catch (error) {
            return error
        }
    }
    async createUser(data) {
        try {
            const createUser = await User.create(data)
            // console.log(createUser)
            return createUser
        } catch (error) {
            // console.log(error)
            return error
        }
    }
    async deleteUser(id){
        try {
            const deleteUser = await User.deleteOne({_id: id})
            console.log(deleteUser)

            return deleteUser
        } catch (error) {
            return error
        }
    }
}

module.exports = UserModel;
// const test = new UserModel();
// // test.getAllData();
// // test.updateUser({_id: '60deb6312373e4b86fc11e4a'}, {name: 'update Sahal 2'})
// test.createUser({
//     username: 'testSahal',
//     email: 'testshl@m.c',
//     name: 'Sahal test',
//     password: '123'
// })
