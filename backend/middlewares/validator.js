const { check, validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');

exports.userValidator = [
    check('name').trim().not().isEmpty().withMessage('Name is missing!'),
    check('email').normalizeEmail().isEmail().withMessage('Email is Invalid'),
    check('password').trim().not().isEmpty().withMessage('Password is missing!')
        .isLength({ min: 8, max: 20 }).withMessage("Password must be 8 to 20 characters long!"),
];

exports.customerValidator = [
    check('name').trim().not().isEmpty().withMessage('Name is missing!'),
    check('email').normalizeEmail().isEmail().withMessage('Email is Invalid'),
    check('contact').trim().not().isEmpty().withMessage('Contact is missing!'),
    check('company').trim().not().isEmpty().withMessage('Company is missing!')
];

exports.validatePassword = [
    check('newPassword').trim().not().isEmpty().withMessage('Password is missing!')
];

exports.signInValidator = [
    check('email').normalizeEmail().isEmail().withMessage('Email is Invalid'),
    check('password').trim().not().isEmpty().withMessage('Password is missing!')
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
        return res.json({ error: error[0].msg });
    }

    next();
}

