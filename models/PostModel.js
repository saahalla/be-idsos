const Mongoose = require('mongoose');
require('../module/mongoose_connections');

const postSchema = new Mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    hashtag: {
        type: [String],
        default: []
    }, 
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
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
const Post = Mongoose.model('Post', postSchema);

class PostModel{
    constructor(){

    }
    async getAllData() {
        try {
            const posts = await Post.find();
            // console.log(posts)
            return posts

        } catch (error) {
            return error
        }
    }
    async getPost(id) {
        try {
            const post = await Post.findOne({_id: id})
            // console.log(post)
            return post
        } catch (error) {
            return error
        } 
    }
    async getUserPosts(userId) {
        try {
            const posts = await Post.find({userId})
            console.log({modeldata: posts})
            return posts
        } catch (error) {
            return error
        }
    }
    async updatePost(search, data) {
        try {
            const updatePost = await Post.updateOne(search, data)
            console.log(updatePost)
            return updatePost
            
        } catch (error) {
            return error
        }
    }
    async createPost(data) {
        try {
            const createPost = await Post.create(data)
            // console.log(createPost)
            return createPost
        } catch (error) {
            // console.log(error)
            return error
        }
    }
    async deletePost(id){
        try {
            const deletePost = await Post.deleteOne({_id: id})
            console.log(deletePost)

            return deletePost
        } catch (error) {
            return error
        }
    }
    /* Get Hashtag From Content */
    getHashtag(str){
        str = str.replace(/,|_|\n/g,'');
        var split = str.split(' ')
        var arr_hashtag = [];
        for(var i=0; i<split.length; i++){
            if(split[i].substr(0,1)==='#'){
                var split2 = split[i].split('#')
                console.log(split[i])
                for(var j=0; j<split2.length; j++){
                    if(split2[j] !== null && split2[j] !== ''){
                        arr_hashtag.push(`#${split2[j]}`);
                    }
                }
                
            }
        }
        return arr_hashtag
    }
}

module.exports = PostModel;