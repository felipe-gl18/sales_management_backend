import { Order } from "../../database/order.js";
import { OrderProducts } from "../../database/orderProducts.js";
export class OrderService {
  async getAllOrders() {
    try {
      const order = new Order("sales_management.db");
      const orders = await order.selectAllOrders();
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createOrder(newOrder) {
    try {
      const order = new Order("sales_management.db");
      const orderProducts = new OrderProducts("sales_management.db");
      const orderName = newOrder["orderName"];
      const orderPrice = newOrder["orderPrice"];
      const createdAt = newOrder["createdAt"];
      const products = newOrder["products"];
      const createdOrderCode = await order.insertOrder([
        orderName,
        orderPrice,
        createdAt,
      ]);
      for (const product in products) {
        await orderProducts.insertOrderProduct([
          createdOrderCode,
          Number(products[product].productCode),
          Number(products[product].quantity),
        ]);
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOrder(orderCode) {
    try {
      const orderProducts = new OrderProducts("sales_management.db");
      const order = new Order("sales_management.db");
      await order.deleteOrder([orderCode]);
      await orderProducts.deleteOrderProducts([orderCode]);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateOrder(orderCode, values) {
    try {
      const orderName = values["orderName"];
      const orderPrice = values["orderPrice"];
      const createdAt = values["createdAt"];
      const order = new Order("sales_management.db");
      await order.updateOrder([orderName, orderPrice, createdAt, orderCode]);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
