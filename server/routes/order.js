const { createOrder, updateOrder, deleteOrder, getMyOrders, getAllOrders, getMonthlyIncome, payOrder, acceptOrder } = require('../controllers/Order');
const { isAuth, isAdmin } = require('../middleware/auth');
const Order = require('../models/Order');


const router = require("express").Router();


router.post("/", isAuth, createOrder);
// router.put("/:id", isAuth, isAdmin, updateOrder);
router.delete('/:id',  isAuth, isAdmin, deleteOrder)
router.get("/mine", isAuth, getMyOrders);
router.get("/", isAuth, isAdmin, getAllOrders);
router.put(":id/pay", isAuth, payOrder);
router.put(":id/accept", isAuth, acceptOrder);

module.exports = router