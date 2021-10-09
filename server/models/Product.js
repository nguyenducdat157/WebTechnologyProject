const mongoose = require('mongoose');
const {ObectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
   
    description: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
    },        
    countInStock: {
        type: Number,
        required: true
    },
    countOfSale: {
        type: Number,
        default: 0 
    },
    imageUrls: [
        {
            type: String,
            required: true,
        }
    ], 
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            review: String
        }
    ],
    category: { 
        type: String,
        enum: ['Iphone', 'Android'],
        required: true
     },
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);