require('dotenv').config();
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var authenticate = require('../middleware/authenticate')

/**
 * Register a new user
 */
router.post('/register', async (req, res) => {
    var user = new User();
    var attributes = User.fillable()
    for(var attr in attributes) {
        if(req.body[attr] != null) {
            user[attr] = req.body[attr]
        }
    }
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    user.password = hashedPassword

    try {
        var newUser = await user.save();
        newUser = newUser.toObject()
        User.hiddenAttributes().forEach(a => delete newUser[a])
        var token = jwt.sign(
            { user: newUser },
            process.env.APP_KEY,
            { expiresIn: 86400 }
        )
        
        res.status(200) // TODO add secure:true when https is set up.
            .cookie('token', token, { maxAge: 86400000, httpOnly: true })
            .json({ auth: true });
    } catch(err) {
        res.status(400).json({message:err.message})
    }
})

/**
 * Login a User
 */
router.post('/login', async (req, res) => {
    try {
        var user = await User.findOne({ username: req.body.username })
        if(!user) res.status(404).json({message: 'User not found.'})
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        
        if(!passwordIsValid) return res.status(401).send({ auth: false })
    
        user = user.toObject()
        User.hiddenAttributes().forEach(a => delete user[a])
        var token = jwt.sign(
            { user:  user }, 
            process.env.APP_KEY,
            { expiresIn: 86400 }
        )

        res.status(200) // TODO add secure:true when https is set up.
            .cookie('token', token, { maxAge: 86400000, httpOnly: true })
            .json({ auth: true });
    } catch(err) {
        res.status(400).json({message:err.message})
    }
})

/**
 * Logout the current user
 * 
 * Requires Authentication
 * 
 */
router.post('/logout', authenticate.authenticate, async (req, res) => {
    // Clear the cookie
    res.clearCookie("token")

    // Clear the user from the request.
    delete req.user

    // Return success
    res.status(200).json({message: 'Successfully logged the user out.'})
})

module.exports = router;