const Product = require('../models/Product')

exports.createProduct = (req, res) => {
    try {
        let product = new Product(req.body);
        if(req.file) {
            let path = '';
            path = path + req.file.path
            product.img = path
        }
        product.save((error, product) => {
            if(error) return res.status(400).json({error});
            if(product) {
                res.status(200).json({success: true, product});
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
      return res.status(400).json({ success: false, error: "Params required" });
    }
};

exports.getProducts = async (req, res) => {
   const qNew = req.query.new;
   const qCategory = req.query.category;
   try {
       let products;
       if(qNew) {
            products = await Product.find().sort({createAt: -1}).limit(1);
       } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            });
       } else {
        products = await Product.find();
       }
       if(!products || products.length === 0) {
           return res.status(200).json({msg: 'Not product founded'});
       }
       return res.status(200).json({success: true, products});
   } catch (err) {
       console.log(err);
       res.status(500).json({ success: false, message: 'Internal server error' })
   }
};

exports.updateProductById = async (req, res) => {
    try {
        const updateProduct = await Product.findById(req.params.id);
        updateProduct.title = req.body.title
        updateProduct.desc = req.body.desc
        updateProduct.img = req.body.img
        updateProduct.categories = req.body.categories
        updateProduct.size = req.body.size
        updateProduct.color = req.body.color
        updateProduct.price = req.body.price
        updateProduct.inStock = req.body.inStock
        updateProduct.countInStock = req.body.countInStock
        updateProduct.saleOff = req.body.saleOff
        updateProduct.soldAmount = req.body.soldAmount
        
        if(req.file) {
            let path = '';
            path = path + req.file.path
            updateProduct.img = path
        }


        updateProduct.save((error, product) => {
            if(error) return res.status(400).json({error});
            if(product) {
                res.status(200).json({success: true, product});
            }
        })
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


