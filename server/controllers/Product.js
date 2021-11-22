const Product = require('../models/Product')

exports.createProduct = (req, res) => {
    try {
        let product = new Product(req.body);
        if(req.file) {
            let path = '';
            path = path + req.file.path
            product.image = path
        }
        product.save((error, product) => {
            if(error) return res.status(400).json({error});
            if(product) {
                res.status(201).json({success: true, message: 'New Product Created', data: product});
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}


exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    if (productId) {
      try {
          const product = await Product.findById(productId);
          res.status(200).json(product);
      } catch (err){
          console.log(err);
          res.status(500).json({ success: false, message: 'Internal server error' })
      }
    } else {
      return res.status(400).json({ success: false, error: "Product Not Found." });
    }
};

exports.getProducts = async (req, res) => {
   const category = req.query.category ? { category: req.query.category } : {};
   const searchKeyword = req.query.searchKeyword
        ? {
            name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
            },
        }
        : {};
        const minPrice = req.query.minPrice
        ? {
            price: {
            $gte: req.query.minPrice
            }
        }
        : {};
        const maxPrice = req.query.maxPrice
        ? {
            price: {
            $lte: req.query.maxPrice
            }
        }
        : {};
        const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'lowest'
            ? { price: 1 }
            : { price: -1 }
        : { _id: -1 };
   try {
    const products = await Product.find({ ...category, ...searchKeyword, ...minPrice, ...maxPrice }).sort(sortOrder);
    return res.status(200).json({success: true, products});
   } catch (err) {
       console.log(err);
       res.status(500).json({ success: false, message: 'Internal server error' })
   }
};

exports.updateProductById = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id });
        if(product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            product.rating = req.body.rating;
            product.numReviews = req.body.numReviews;

             
            if(req.file) {
                let path = '';
                path = path + req.file.path
                product.image = path
            }

            product.save((error, updatedProduct) => {
                if(error) return res.status(400).json({error});
                if(product) {
                    res.status(200).json({success: true, message: 'Product Updated', data: updatedProduct});
                }
            })

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({success: true, message: 'Product has been deleted..'})
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

exports.reviewProduct = async (req, res) => { //reviewProduct()
    try {
        const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        image: req.body.image
      };

      if(req.file) {
        let path = '';
        path = path + req.file.path
        review.image = path
    }
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).json({
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        message: 'Review saved successfully.',
        success: true
      });
    } else {
      res.status(404).json({ message: 'Product Not Found', success: false });
    }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

