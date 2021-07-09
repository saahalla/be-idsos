const express = require('express')
const router = express.Router();
const getUsers = require('../controllers/UserControllers/index')
const addUser = require('../controllers/UserControllers/add')
const deleteUser = require('../controllers/UserControllers/delete')
const showUser = require('../controllers/UserControllers/show')
const getUserByEmailUsername = require('../controllers/UserControllers/getUserByUsernameEmail')
const updateUser = require('../controllers/UserControllers/update')
const login = require('../controllers/UserControllers/login')

const {runValidation, validationUserAdd} = require('../validations/usersValidation')

/* GET users listing. */
router.get('/', getUsers);
router.post('/addUser', validationUserAdd, runValidation, addUser)
router.get('/delete/:id', deleteUser)
router.get('/show/:id', showUser)
router.get('/getUser', getUserByEmailUsername)
router.post('/update', updateUser)
router.post('/login', login)

module.exports = router;
