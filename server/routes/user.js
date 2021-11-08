const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../middleware/auth');
const upload = require('../middleware/upload');

const { route } = require('./auth');
const { updateUserById, getUserById, deleteUser, deleteUserByAdmin, getAllUser, getUserStats } = require('../controllers/User');

router.put('/:id',verifyTokenAndAuthorization, updateUserById);
router.get('/find/:id', verifyTokenAndAdmin, getUserById);
router.delete('/admin/:id', verifyTokenAndAdmin, deleteUserByAdmin);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/', verifyTokenAndAdmin, getAllUser);
router.get('/stats', verifyTokenAndAdmin, getUserStats);

module.exports = router