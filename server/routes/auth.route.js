const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken') // to generate token
const bcrypt = require('bcryptjs'); //encrypt password

//Check validation for requests
const {checkSchema, validationResult, check} = require('express-validator');
const gravatar = require('gravatar');
const auth = require('../middleware/auth')
//Models
const User = require('../models/User')

//@route POST api/user
//@desc User Information
//@access Private
router.get('/', auth, async(req, res) => {
    try {
        //get user information by id
        const user = await User.findById(req.user.id).select('-password');
        console.log(user);
        res.json(user)
    } catch(error) {
        console.log(error);
        res.status(500).send('Server error')
    }
})

//@route POST api/user/register
//@desc Register user
//@access Public

router.post('/register', [
    //validation
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    //get username and email password from request
    const {username, email, password} = req.body;

    try {
        //check if user already exist
        let user = await User.findOne({email});

        //If user exist
        if(user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'User already exists',
                    },
                ],
            });
        }

        // If not exists
        // create user object
        user = new User({
            username, email, password
        });

        //encrypt password
        // const salt = await bcrypt.getSalt(10) // generate salt contains 10
        //save password
        // user.password = await bcrypt.hash(password, 10) // use user password and salt to hash password

        const saltRounds = 10;
        
        bcrypt.genSalt(saltRounds, async (err, salt) => {
            if(err) {
                console.log(err);
            }
            user.password = await bcrypt.hash(password, salt);
        });
       
        //save user in database
        await user.save();

        //payload to generate token
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000,
            }, 
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

//@route POST api/user/login
//@desc Login user
//@access Public
router.post('/login', [
    check('email', 'please inclue a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    //If error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //if everrything is good
    //get email and password from request body
    const {email, password} = req.body;

    try {
        //find user
        let user = await User.findOne({
            email
        });

        //if user not found in database
        if(!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            })
        }

        //Know user founded by email let's compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        //password dont't match
        if(!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            })
        }

        //payload for jwt 
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;
                res.json({
                    token
                })
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json('Server error')
    }
})

module.exports = router