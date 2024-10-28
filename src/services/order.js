import fs from "node:fs/promises";
import { format } from "date-fns";
import { randomUUID } from "node:crypto";
export class OrderService {
  async getAllOrders(month) {
    try {
      const orders = await this.readJSONFile();
      const filteredOrders = this.#getByMonth(orders, month);
      return filteredOrders;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createOrder(newOrder) {
    try {
      const defaultValues = {
        uuid: randomUUID(),
        createdAt: format(new Date(), "dd/MM/yyyy"),
      };
      const values = Object.assign(newOrder, defaultValues);
      const orders = await this.readJSONFile();
      orders.push(values);
      await fs.writeFile("database/orders.json", JSON.stringify(orders));
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOrder(uuid) {
    try {
      const orders = await this.readJSONFile();
      const newOrders = orders.filter((order) => order.uuid !== uuid);
      await fs.writeFile("database/orders.json", JSON.stringify(newOrders));
      return;
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
  async readJSONFile() {
    const content = await fs.readFile("database/orders.json", "utf-8");
    const orders = content ? JSON.parse(content) : [];
    return orders;
  }
}
