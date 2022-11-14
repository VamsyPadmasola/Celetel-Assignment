const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { isValidObjectId } = require("mongoose");
const { sendError, generateRandomByte } = require("../uitls/helper");
const user = require("../models/user");

exports.create = async (req, res) => {
    const { name, email, password } = req.body

    const oldUser = await User.findOne({ email })

    if (oldUser) return sendError(res, "This email is already in use.");

    const newUser = new User({ name: name, email: email, password: password });
    await newUser.save()
};

exports.signIn = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) return sendError(res, 'Email/Password Mismatch');

    const isMatched = await user.comparePassword(password)
    if (!isMatched) return sendError(res, 'Email/Password Mismatch');

    const { _id, name, isVerified, role } = user;

    const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET)

    res.json(
        {
            user:
            {
                id: _id, name,
                email,
                role,
                token: jwtToken, isVerified,
                role
            }
        })

}
