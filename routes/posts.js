const express = require('express')
const router = express.Router();
const addPost = require('../controllers/PostController/add');
const showUserPosts = require('../controllers/PostController/showUserPosts')
const getAll = require('../controllers/PostController/getAll')
const updatePost = require('../controllers/PostController/updatePost')

/* GET users listing. */
// router.get('/', getUsers);
router.post('/addPost', addPost)
router.get('/showUserPosts', showUserPosts)
router.get('/getAll', getAll)
router.post('/updatePost', updatePost)

module.exports = router;
