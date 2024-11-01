import express from "express";
import { OrderProductsController } from "../controllers/ordersProducts.js";
const router = express.Router();
const orderProductsController = new OrderProductsController();
router.get("", orderProductsController.getAllOrderProducts);
router.post("", orderProductsController.createOrderProducts);
export default router;
