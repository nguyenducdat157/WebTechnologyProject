
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const order = new Order({
    userId: req.body.userId,
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });

  const listProduct = await req.body.orderItems
  console.log(listProduct);

  for(let i = 0; i < listProduct.length; i++) {
    let product =  await Product.findById({_id: listProduct[i].product});
    product.countInStock = listProduct[i].countInStock - Number(listProduct[i].qty);
    product.save();
  } 

    try {
      const newOrder = await order.save();
      res.status(201).json({success: true, message: "New Order Created", data: newOrder});
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// UPDATE
exports.updateOrder = async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
//DETELE
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.status.json({success: true, deletedOrder})
    } 
  }catch (err) {
    res.status(500).json(err);
  }
};
  
// USER GET ORDERS
exports.getMyOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      .populate('userId', ['name']);
      if(orders.length) {
        res.status(200).json(orders.filter((order) => {
          return order.userId._id.toString() === req.user._id;
        }));
      }
      else {
        res.status(201).json([])
      }
      
    } catch (err) {
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  };

// GET ALL

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      .populate('userId', ['name']);
      // .populate('postBy', ['userName', 'avatar', 'status'])
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
};

// GET ORDER BY ID WITH ADMIN
exports.getOrderById =  async (req, res) => { // findOrderByIdWithAdmin()
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order Not Found.")
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET MONTHLY INCOME
// exports.getMonthlyIncome = async (req, res) => {
//     const productId = req.query.pid;
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
//     try {
//       const income = await Order.aggregate([
//         {
//           $match: {
//             createdAt: { $gte: previousMonth },
//             ...(productId && {
//               products: { $elemMatch: { productId } },
//             }),
//           },
//         },
//         {
//           $project: {
//             month: { $month: "$createdAt" },
//             sales: "$amount",
//           },
//         },
//         {
//           $group: {
//             _id: "$month",
//             total: { $sum: "$sales" },
//           },
//         },
//       ]);
//       res.status(200).json(income);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   };

exports.payOrder = async (req, res) => { // payOrder()
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid.', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order not found.' })
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
};
  
exports.acceptOrder = async (req, res) => { 
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered.', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order not found.' })
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
};
  