const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken') // to generate token
const bcrypt = require('bcryptjs'); //encrypt password
const CryptoJS = require("crypto-js");
//Check validation for requests
const {checkSchema, validationResult, check} = require('express-validator');
const gravatar = require('gravatar');
// const auth = require('../middleware/auth')
//Models
const User = require('../models/User')

//@route POST api/user
//@desc User Information
//@access Private
// router.get('/', auth, async(req, res) => {
//     try {
//         //get user information by id
//         const user = await User.findById(req.user.id).select('-password');
//         console.log(user);
//         res.json(user)
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: 'Internal server error' })
//     }
// })

//@route POST api/user/register
//@desc Register user
//@access Public

router.post('/register', 
[
    // validation
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    console.log(errors)
      return res.status(400).json({
        
        errors: errors.array(),
      });
    }
    //get username and email password from request
    const {username, email, password} = req.body;

    try {
        //check if user already exist
        const user = await User.findOne({email});

        //If user exist
        if(user) {
            return res.status(400).json({
                success: false,
                message: 'User already taken'
            });
        }

        // If not exists
        // create user object
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SECRET
            ).toString(),
        });

        //save user in database
        await newUser.save();

        //payload to generate token
        const payload = {
            id: newUser._id,
            isAdmin: newUser.isAdmin,
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: '3d',
            }, 
            (err, token) => {
                if(err) throw err;
                res.json({
                    success: true,
                    message: 'User created successfully',
                    token,
                    newUser
                })
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/user/login
//@desc Login user
//@access Public
router.post('/login', [
    check('username', 'username is required').exists(),
    check('password', 'password is required').exists()
], async (req, res) => {
    //If error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    //if everrything is good
    //get email and password from request body
    const {username, password} = req.body;

    try {
        //find user
        let user = await User.findOne({
            username
        });

        //if user not found in database
        if(!user) {
            return res.status(400).json({
                success: false, 
                message: 'Incorrect username or password' 
            })
        }

        const OriginalPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8);
        
        const isMatch = OriginalPassword === password;
          //password dont't match
        if(!isMatch) {
            return res.status(400).json({
                success: false, 
                message: 'Incorrect username or password' 
            })
        }

        //payload for jwt 
        const payload = {
            id: user._id,
            isAdmin: user.isAdmin,
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: '3d'
            }, (err, token) => {
                if(err) throw err;
                res.json({
                    success: true,
			        message: 'User logged in successfully',
			        token,
                    user
                })
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router