import { OrderProductsService } from "../services/ordersProducts.js";
export class OrderProductsController {
  async getAllOrderProducts(req, res) {
    const orderProducts = new OrderProductsService();
    const orderProductss = await orderProducts.getAllOrderProducts(
      req.query.month
    );
    res.json({ data: orderProductss, message: "Ordens retornadas" });
  }
  async createOrderProducts(req, res) {
    const orderProducts = new OrderProductsService();
    await orderProducts.createOrderProducts(req.body);
    res.json({ data: [], message: "Compra registrada com sucesso" });
  }
}
