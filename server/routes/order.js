const { createOrder, updateOrder, deleteOrder, getMyOrders, getAllOrders, getMonthlyIncome } = require('../controllers/Order');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middleware/auth');
const Order = require('../models/Order');


const router = require("express").Router();


router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete('/:id',  verifyTokenAndAdmin, deleteOrder)
router.get("/find/:userId", verifyTokenAndAuthorization, getMyOrders);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);