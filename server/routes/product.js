const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
// const auth = require('../middleware/auth');
const {isAuth, isAdmin} = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    createProduct,
    updateProductById,
    getProductById,
    getProducts,
    deleteProduct,
    reviewProduct
} = require('../controllers/Product');
const { route } = require('./auth');

router.post('/', isAuth, isAdmin, upload.single('image'), createProduct);
router.put('/:id', isAuth, isAdmin, upload.single('image'), updateProductById);
router.get('/:id', getProductById);
router.get('/', getProducts);
router.delete('/:id', isAuth, isAdmin, deleteProduct)
router.post('/:id/reviews', isAuth, upload.single('image'), reviewProduct);
module.exports = router