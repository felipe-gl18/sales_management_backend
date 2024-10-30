import { OrderProducts } from "../../database/orderProducts.js";
export class OrderProductsService {
  async getAllOrderProducts() {
    try {
      const orderProducts = new OrderProducts("sales_management.db");
      const orderProductss = await orderProducts.selectOrderWithProducts();
      return orderProductss;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createOrderProducts(newOrderProducts) {
    try {
      const orderProducts = new OrderProducts("sales_management.db");
      const orderProductsName = newOrderProducts["orderProductsName"];
      const orderProductsPrice = newOrderProducts["orderProductsPrice"];
      const orderProductsCode = newOrderProducts["orderProductsCode"];
      await orderProducts.insertOrderProducts([
        orderProductsName,
        orderProductsPrice,
        orderProductsCode,
      ]);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
