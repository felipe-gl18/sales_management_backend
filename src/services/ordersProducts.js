import { OrderProducts } from "../../database/orderProducts.js";
export class OrderProductsService {
  async getAllOrderProducts(month) {
    try {
      const orderProducts = new OrderProducts();
      const orderProductss = await orderProducts.selectOrderWithProducts(month);
      return orderProductss;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createOrderProducts(newOrderProducts) {
    try {
      const orderProducts = new OrderProducts();
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
