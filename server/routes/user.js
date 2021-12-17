const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {isAuth, isAdmin, verifyTokenAndAuthorization} = require('../middleware/auth');
const upload = require('../middleware/upload');

const { route } = require('./auth');
const { updateUserById, getUserById, deleteUserByAdmin, getAllUser, changePassword } = require('../controllers/User');

router.put('/:id', isAuth,  updateUserById);
router.get('/find/:id', isAuth, isAdmin, getUserById);
router.delete('/admin/:id', isAuth, isAdmin, deleteUserByAdmin);
router.get('/', isAuth, isAdmin, getAllUser);
router.put('/change-password/:id', isAuth, changePassword);


module.exports = router