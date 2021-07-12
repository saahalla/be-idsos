var express = require('express');
var router = express.Router();
const Follow = require('../controllers/FollowController')
const unFollow = require('../controllers/FollowController/unfollow')
const showData = require('../controllers/FollowController/show')
const checkFollowers = require('../controllers/FollowController/checkFollowers')
const checkFollowings = require('../controllers/FollowController/checkFollowings')
const authenticateToken = require('../middleware/Authentication')

/* GET home page. */
router.post('/follow', authenticateToken, Follow);
router.post('/unfollow', authenticateToken, unFollow);
router.get('/showData', authenticateToken, showData);
router.get('/checkFollowers/:id', authenticateToken, checkFollowers);
router.get('/checkFollowings/:id', authenticateToken, checkFollowings);

module.exports = router;
