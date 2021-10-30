const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
// const auth = require('../middleware/auth');
const {verifyTokenAndAdmin} = require('../middleware/auth');
const authAdmin = require('../middleware/adminAuth');
const upload = require('../middleware/upload');
const {
    createProduct,
    updateProductById,
    getProductById,
    getProducts,
    deleteProduct
} = require('../controllers/Product');
const { route } = require('./auth');

router.post('/', verifyTokenAndAdmin, upload.single('img'), createProduct);
router.put('/:id',verifyTokenAndAdmin, upload.single('img'), updateProductById);
router.get('/find/:id', getProductById);
router.get('/', getProducts);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct)
module.exports = router