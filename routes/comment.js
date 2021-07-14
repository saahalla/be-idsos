const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/Authentication')
const addComment = require('../controllers/CommentControllers/addComment')
const getComment = require('../controllers/CommentControllers/getComment')
const getAllComments = require('../controllers/CommentControllers/getAll')
const deleteComment = require('../controllers/CommentControllers/deleteComment')
const updateComment = require('../controllers/CommentControllers/updateComment')
const showPostComments = require('../controllers/CommentControllers/getPostComments')

/* GET users listing. */
router.get('/',authenticateToken, getAllComments);
router.post('/addComment', authenticateToken, addComment)
router.get('/showPostComments/:postId', authenticateToken, showPostComments)
router.get('/showComment/:id', authenticateToken, getComment)
// router.get('/getAll', authenticateToken, getAll)
router.post('/updateComment', authenticateToken, updateComment)
router.get('/delete/:id', authenticateToken, deleteComment)

module.exports = router;
