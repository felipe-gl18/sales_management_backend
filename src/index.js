import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import order from "./routes/order.js";
const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/order", order);
app.listen(process.env.PORT || 8080, () => {
  console.log(`The server is running at ${process.env.PORT || 8080}`);
});
