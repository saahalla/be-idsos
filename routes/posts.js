const express = require('express')
const router = express.Router()
const addPost = require('../controllers/PostController/add')
const showPost = require('../controllers/PostController/showPost')
const showUserPosts = require('../controllers/PostController/showUserPosts')
const getAll = require('../controllers/PostController/getAll')
const updatePost = require('../controllers/PostController/updatePost')
const deletePost = require('../controllers/PostController/delete')
const authenticateToken = require('../middleware/Authentication')

/* GET users listing. */
// router.get('/', getUsers);
router.post('/addPost', authenticateToken, addPost)
router.get('/showUserPosts/:userId', authenticateToken, showUserPosts)
router.get('/showPost/:id', authenticateToken, showPost)
router.get('/getAll', authenticateToken, getAll)
router.post('/updatePost', authenticateToken, updatePost)
router.get('/delete/:id', authenticateToken, deletePost)

module.exports = router;
