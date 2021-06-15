const express = require('express');
const router = express.Router();
const getUsers = require('../controllers/UserControllers/index')
const addUser = require('../controllers/UserControllers/add')

/* GET users listing. */
router.get('/', getUsers);
router.post('/addUser', addUser)

module.exports = router;
