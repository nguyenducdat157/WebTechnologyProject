const Product = require('../models/Product')

exports.createProduct = (req, res) => {
    let product = new Product({ 
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        color: req.body.color,
        countInStock: req.body.countInStock,
        countOfSale: req.body.countOfSale,
        category: req.body.category
    });
    if(req.files) {
        req.files.forEach((file, index, arr) => {
            let path = '';
            path = path + file.path
            product.imageUrls[index] = path
        });
    }

    product.save((error, product) => {
        if(error) return res.status(400).json({error});
        if(product) {
            res.status(201).json({success: true, product});
        }
    })

}


exports.getProductById = (req, res) => {
    const productId = req.params.id;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({success: true, product });
        }
      });
    } else {
      return res.status(400).json({ success: false, error: "Params required" });
    }
};

exports.getProducts = async (req, res) => {
   try {
       const products = await Product.find();
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
        updateProduct.name = await req.body.name,
        updateProduct.price = await req.body.price,
        updateProduct.description = await req.body.description,
        updateProduct.color = await req.body.color,
        updateProduct.countInStock = await req.body.countInStock,
        updateProduct.countOfSale =  await req.body.countOfSale,
        updateProduct.category = await req.body.category
        if(req.files) {
            updateProduct.imageUrls = [];
            req.files.forEach((file, index) => {
                let path = '';
                path = path + file.path
                updateProduct.imageUrls[index] = path
            });
        }
    
        updateProduct.save((error, product) => {
            if(error) return res.status(400).json({error});
            if(product) {
                res.status(201).json({success: true, product});
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}


