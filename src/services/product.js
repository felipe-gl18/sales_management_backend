import { Products } from "../../database/products.js";

export class ProductService {
  async getAllProducts() {
    try {
      const products = new Products();
      const result = await products.selectAllProducts();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createProduct(newProduct) {
    try {
      const { productname, productprice, productcode } = newProduct;
      const products = new Products();
      await products.insertProduct(productname, productprice, productcode);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteProduct(productCode) {
    try {
      const products = new Products();
      await products.deleteProduct(productCode);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateProduct(productcode, values) {
    try {
      const products = new Products();
      const { productname, productprice } = values;
      await products.updateProduct(productname, productprice, productcode);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
