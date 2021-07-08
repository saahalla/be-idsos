const express = require('express')
const router = express.Router()
const addPost = require('../controllers/PostController/add')
const showPost = require('../controllers/PostController/showPost')
const showUserPosts = require('../controllers/PostController/showUserPosts')
const getAll = require('../controllers/PostController/getAll')
const updatePost = require('../controllers/PostController/updatePost')
const deletePost = require('../controllers/PostController/delete')

/* GET users listing. */
// router.get('/', getUsers);
router.post('/addPost', addPost)
router.get('/showUserPosts/:userId', showUserPosts)
router.get('/showPost/:id', showPost)
router.get('/getAll', getAll)
router.post('/updatePost', updatePost)
router.get('/delete/:id', deletePost)

module.exports = router;
