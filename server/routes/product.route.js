const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/adminAuth');
const upload = require('../middleware/upload');
const {
    createProduct,
    updateProductById,
    getProductById,
    getProducts
} = require('../controllers/Product');

router.post('/create', auth, authAdmin, upload.array('imageUrls[]'), createProduct);
router.put('/update/:id',auth, authAdmin, upload.array('imageUrls[]'), updateProductById);
router.get('/:id', getProductById);
router.get('/', getProducts);
module.exports = router