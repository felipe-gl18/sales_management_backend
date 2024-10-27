import express from "express";
import { OrderController } from "../controllers/order.js";
const router = express.Router();
const orderController = new OrderController();
router.get("", orderController.getAllOrders);
router.post("", orderController.createOrder);
export default router;
