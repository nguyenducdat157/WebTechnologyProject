const mongoose = require('mongoose');
const {ObectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    saleOff: {type: Number, min: 0, max: 100, default: 0, required: true },
    countInStock: {type: Number, default: 0, required: true},
    soldAmount: {type: Number, default: 0, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);