import { Database } from "./base.js";
export class Products extends Database {
  constructor() {
    super();
  }
  async structureProductTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
      productCode SMALLINT PRIMARY KEY,
      productName VARCHAR(50),
      productPrice DECIMAL(6, 2)
    );`;
    return await this.query(sql, []);
  }
  async insertProduct(productName, productPrice, productCode) {
    const sql = `INSERT INTO products (productname, productprice,   ) VALUES ($1, $2, $3)`;
    return await this.query(sql, [productName, productPrice, productCode]);
  }
  async updateProduct(productName, productPrice, productCode) {
    const sql = `UPDATE products SET productName = $1, productPrice = $2  WHERE productCode = $3`;
    return await this.query(sql, [productName, productPrice, productCode]);
  }
  async deleteProduct(productCode) {
    const sql = `DELETE FROM products WHERE productCode = $1`;
    return await this.query(sql, [productCode]);
  }
  async selectAllProducts() {
    const sql = `SELECT * FROM products`;
    const products = await this.query(sql, []);
    return products;
  }
}
