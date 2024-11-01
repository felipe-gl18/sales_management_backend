import { OrderProducts } from "../../database/orderProducts.js";
import { Orders } from "../../database/orders.js";
export class OrderService {
  async getAllOrders() {
    try {
      const order = new Orders();
      const orders = await order.selectAllOrders();
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createOrder(newOrder) {
    try {
      const order = new Orders();
      const orderProducts = new OrderProducts();
      const ordername = newOrder["ordername"];
      const orderprice = newOrder["orderprice"];
      const createdAt = newOrder["createdAt"];
      const products = newOrder["products"];
      const ordercode = await order.insertOrder(
        ordername,
        orderprice,
        createdAt
      );
      for (const product in products) {
        await orderProducts.insertOrderProduct(
          ordercode,
          Number(products[product].productcode),
          Number(products[product].quantity)
        );
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOrder(ordercode) {
    try {
      const orderProducts = new OrderProducts();
      const order = new Orders();
      await order.deleteOrder(ordercode);
      await orderProducts.deleteOrderProducts(ordercode);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateOrder(ordercode, values) {
    try {
      const ordername = values["ordername"];
      const orderprice = values["orderprice"];
      const createdAt = values["createdAt"];
      const order = new Orders();
      await order.updateOrder(ordername, orderprice, createdAt, ordercode);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
