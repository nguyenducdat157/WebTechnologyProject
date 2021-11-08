const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const {verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken} = require('../middleware/auth');
const { CreateCart, UpdateCart, deleteCart, getCartUser, getAllCart } = require('../controllers/Cart');


router.post('/',verifyToken, CreateCart);
router.put('/:id', verifyTokenAndAuthorization, UpdateCart);
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);
router.get('/find/:id', verifyTokenAndAuthorization, getCartUser);
router.get('/', verifyTokenAndAdmin, getAllCart);

module.exports = router