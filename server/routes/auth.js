const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken') // to generate token
const bcrypt = require('bcryptjs'); //encrypt password
const CryptoJS = require("crypto-js");
//Check validation for requests
//const {checkSchema, validationResult, check} = require('express-validator');
const gravatar = require('gravatar');
const User = require('../models/User');
const { getToken } = require('../middleware/auth');


router.post('/register', async (req, res) => {
    // console.log(req.body)
    //get username and email password from request
    const {name, email, password} = req.body;

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
            name: req.body.name,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SECRET
            ).toString(),
        });

        //save user in database
        await newUser.save();
        // jwt.sign(
        //     payload,
        //     process.env.JWT_SECRET, {
        //         expiresIn: '3d',
        //     }, 
        //     (err, token) => {
        //         if(err) throw err;
        //         res.json({
        //             success: true,
        //             message: 'User created successfully',
        //             token,
        //             newUser
        //         })
        //     }
        // )
        if (newUser) {
            res.send({
                user: {
                    _id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                },
              token: getToken(newUser),
              success: true,
              message: 'User created successfully',
            });
          } else {
            res.status(401).send({ message: 'Invalid User Data.' });
          }


    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


router.post('/signin', async (req, res) => {

    //if everrything is good
    //get email and password from request body
    const {email, password} = req.body;

    try {
        //find user
        let user = await User.findOne({
            email: email,
            // password: password
        });

        //if user not found in database
        if(!user) {
            return res.status(401).json({
                success: false, 
                message: 'Incorrect Email or password' 
            })
        }

        const OriginalPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8);
        
        const isMatch = OriginalPassword === password;
          //password dont't match
        if(!isMatch) {
            return res.status(401).json({
                success: false, 
                message: 'Incorrect username or password' 
            })
        }

        // //payload for jwt 
        // const payload = {
        //     id: user._id,
        //     isAdmin: user.isAdmin,
        // }

        // jwt.sign(
        //     payload,
        //     process.env.JWT_SECRET, {
        //         expiresIn: '3d'
        //     }, (err, token) => {
        //         if(err) throw err;
        //         res.json({
        //             success: true,
		// 	        message: 'User logged in successfully',
		// 	        token,
        //             user
        //         })
        //     }
        // )

        res.json({
            success: true,
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token: getToken(user),
            message: 'User logged in successfully',
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router