var express = require('express');
var router = express.Router();
const Follow = require('../controllers/FollowController')
const unFollow = require('../controllers/FollowController/unfollow')
const showData = require('../controllers/FollowController/show')
const checkFollowers = require('../controllers/FollowController/checkFollowers')
const checkFollowings = require('../controllers/FollowController/checkFollowings')

/* GET home page. */
router.post('/follow', Follow);
router.post('/unfollow', unFollow);
router.get('/showData', showData);
router.get('/checkFollowers/:id', checkFollowers);
router.get('/checkFollowings/:id', checkFollowings);

module.exports = router;
