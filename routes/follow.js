var express = require('express');
var router = express.Router();
const Follow = require('../controllers/FollowController')
const showData = require('../controllers/FollowController/show')
const checkFollowers = require('../controllers/FollowController/checkFollowers')
const checkFollowings = require('../controllers/FollowController/checkFollowings')

/* GET home page. */
router.get('/', Follow);
router.get('/showData', showData);
router.get('/checkFollowers/:id', checkFollowers);
router.get('/checkFollowings/:id', checkFollowings);

module.exports = router;
