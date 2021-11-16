const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {isAuth, isAdmin} = require('../middleware/auth');
const upload = require('../middleware/upload');

const { route } = require('./auth');
const { updateUserById, getUserById, deleteUserByAdmin, getAllUser } = require('../controllers/User');

router.put('/:id', isAuth, updateUserById);
router.get('/find/:id', isAuth, isAdmin, getUserById);
router.delete('/admin/:id', isAuth, isAdmin, deleteUserByAdmin);
router.get('/', isAuth, isAdmin, getAllUser);


module.exports = router