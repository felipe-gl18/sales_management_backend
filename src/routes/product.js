import express from "express";
import { ProductController } from "../controllers/product.js";
const router = express.Router();
const productController = new ProductController();
router.get("", productController.getAllProducts);
router.post("", productController.createProduct);
router.delete("/:productCode", productController.deleteProduct);
router.put("/:productCode", productController.updateProduct);
export default router;
