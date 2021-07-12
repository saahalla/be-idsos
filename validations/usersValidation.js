const {check, oneOf, validationResult}  = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()
        })
    }
    next()
}

exports.validationUserAdd = [
    check('username', 'username can not be empty').notEmpty().isLength({min: 2, max: 20}).withMessage('username length minimal 5 character maximal 20 character'),
    check('name', 'name can not be empty').notEmpty().isLength({min: 5, max: 40}).withMessage('username length minimal 5 character maximal 40 character'),
    check('email', 'email can not be empty').notEmpty().isEmail().withMessage('your email was not valid email'),
    check('password', 'password can not be empty').notEmpty().isLength({min: 8}).withMessage('password length minimal 8 character')
]
// exports.validationUserUpdate = oneOf([
//     check('id', 'id can not be empty').notEmpty(),
//     check('username').notEmpty().isLength({min: 5, max: 20}).withMessage('username length minimal 5 character maximal 20 character'),
//     check('name').isLength({min: 5, max: 40}).withMessage('username length minimal 5 character maximal 40 character'),
//     check('email').isEmail().withMessage('your email was not valid email'),
//     check('password').isLength({min: 8}).withMessage('password length minimal 8 character')
// ])