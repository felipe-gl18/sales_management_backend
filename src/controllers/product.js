import { ProductService } from "../services/product.js";
export class ProductController {
  async getAllProducts(req, res) {
    const product = new ProductService();
    const products = await product.getAllProducts();
    res.json({ data: products, message: "Produtos retornados" });
  }
  async createProduct(req, res) {
    const product = new ProductService();
    await product.createProduct(req.body);
    res.json({ data: [], message: "Produto registrado com sucesso" });
  }
  async deleteProduct(req, res) {
    const product = new ProductService();
    await product.deleteProduct(req.params.productCode);
    res.json({ data: [], message: "Produto deletado" });
  }
  async updateProduct(req, res) {
    const product = new ProductService();
    await product.updateProduct(req.params.productCode, req.body);
    res.json({ data: [], message: "Produto alterado" });
  }
}
