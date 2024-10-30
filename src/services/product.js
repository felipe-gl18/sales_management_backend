import { Product } from "../../database/product.js";
export class ProductService {
  async getAllProducts() {
    try {
      const product = new Product("sales_management.db");
      const products = await product.selectAllProducts();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createProduct(newProduct) {
    try {
      const product = new Product("sales_management.db");
      const productName = newProduct["productName"];
      const productPrice = newProduct["productPrice"];
      const productCode = newProduct["productCode"];
      await product.insertProduct([productName, productPrice, productCode]);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteProduct(productCode) {
    try {
      const product = new Product("sales_management.db");
      await product.deleteProduct([productCode]);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateProduct(productCode, values) {
    try {
      const productName = values["productName"];
      const productPrice = values["productPrice"];
      const product = new Product("sales_management.db");
      await product.updateProduct([productName, productPrice, productCode]);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
