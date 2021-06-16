const express = require('express')
const router = express.Router();
const getUsers = require('../controllers/UserControllers/index')
const addUser = require('../controllers/UserControllers/add')
const deleteUser = require('../controllers/UserControllers/delete')
const deleteAllUser = require('../controllers/UserControllers/deleteAll')
const showUser = require('../controllers/UserControllers/show')
const updateUser = require('../controllers/UserControllers/update')

/* GET users listing. */
router.get('/', getUsers);
router.post('/addUser', addUser)
router.get('/deleteUser/:id', deleteUser)
router.get('/deleteAllUser', deleteAllUser)
router.get('/show', showUser)
router.post('/update', updateUser)

module.exports = router;
