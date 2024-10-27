import fs from "node:fs/promises";
import { format } from "date-fns";
export class OrderService {
  async getAllOrders(query) {
    try {
      const content = await fs.readFile("database/orders.json", "utf-8");
      const orders = content ? JSON.parse(content) : [];
      const filteredOrders = this.#getByMonth(orders, query.month);
      return filteredOrders;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createOrder(newOrder) {
    try {
      const content = await fs.readFile("database/orders.json", "utf-8");
      const orders = content ? JSON.parse(content) : [];
      orders.push({ ...newOrder, createdAt: format(new Date(), "dd/MM/yyyy") });
      await fs.writeFile("database/orders.json", JSON.stringify(orders));
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }
  #getByMonth(orders, month) {
    const filteredOrders = orders.filter(
      (order) => order.createdAt.split("/")[1] == month
    );
    return filteredOrders;
  }
}
