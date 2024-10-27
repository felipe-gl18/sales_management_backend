import { OrderService } from "../services/order.js";

export class OrderController {
  async getAllOrders(req, res) {
    const order = new OrderService();
    const orders = await order.getAllOrders(req.query);
    res.json({ data: orders, message: "Ordens retornadas" });
  }
  async createOrder(req, res) {
    const order = new OrderService();
    await order.createOrder(req.body);
    res.json({ data: [], message: "Compra registrada com sucesso" });
  }
}
