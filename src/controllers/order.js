import { OrderService } from "../services/order.js";

export class OrderController {
  async getAllOrders(req, res) {
    const order = new OrderService();
    const orders = await order.getAllOrders(req.query.month);
    res.json({ data: orders, message: "Ordens retornadas" });
  }
  async createOrder(req, res) {
    const order = new OrderService();
    await order.createOrder(req.body);
    res.json({ data: [], message: "Compra registrada com sucesso" });
  }
  async deleteOrder(req, res) {
    const order = new OrderService();
    await order.deleteOrder(req.params.uuid);
    res.json({ data: [], message: "Pedido deletado" });
  }
  async updateOrder(req, res) {
    const order = new OrderService();
    await order.updateOrder(req.params.uuid, req.body);
    res.json({ data: [], message: "Pedido alterado" });
  }
}
