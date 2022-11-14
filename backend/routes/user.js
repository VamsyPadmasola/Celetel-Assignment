const express = require('express');
const jwt = require('jsonwebtoken')
const { userValidator, validate, signInValidator, validatePassword } = require('../middlewares/validator.js');
const { create, signIn } = require('../controllers/user');

const { isAuth } = require('../middlewares/auth.js');
const router = express.Router()

router.post("/create", userValidator, validate, create);
router.post("/signin", signInValidator, validate, signIn);


router.get('/is-auth', isAuth, (req, res) => {
    const { user } = req;
    res.json({ user: { id: user._id, name: user.name, email: user.email } })
})

module.exports = router; 
