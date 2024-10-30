import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import order from "./routes/order.js";
import product from "./routes/product.js";
import orderProducts from "./routes/ordersProducts.js";
import { Order } from "../database/order.js";
import { Product } from "../database/product.js";
import { OrderProducts } from "../database/orderProducts.js";
const orderTable = new Order("sales_management.db");
const productTable = new Product("sales_management.db");
const orderProductsTable = new OrderProducts("sales_management.db");
(async () => {
  await orderTable.structureOrderTable();
  await productTable.structureProductTable();
  await orderProductsTable.structureOrderProductsTable();
})();
const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/order", order);
app.use("/orderProducts", orderProducts);
app.use("/product", product);
app.listen(process.env.PORT || 8080, () => {
  console.log(`The server is running at ${process.env.PORT || 8080}`);
});
