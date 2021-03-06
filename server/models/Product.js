const mongoose = require('mongoose');
const {ObectId} = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
      image: { type: String }
    },
    {
      timestamps: true,
    }
);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema]
  }, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);