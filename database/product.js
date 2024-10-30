import sqlite3 from "sqlite3";
import { SQLITE } from "./db.js";
export class Product extends SQLITE {
  constructor(db, allow = sqlite3.OPEN_READWRITE) {
    super(db, allow);
  }
  async structureProductTable() {
    const sql = `CREATE TABLE IF NOT EXISTS products (
        productCode INTEGER PRIMARY KEY,
        productName TEXT NOT NULL,
        productPrice REAL NOT NULL
      )`;
    await this.structure(sql);
  }
  async insertProduct(args) {
    const sql = `INSERT INTO products (productName, productPrice, productCode) VALUES (?, ?, ?)`;
    await this.insertQuery(sql, args);
  }
  async updateProduct(args) {
    const sql = `UPDATE products SET productName = ?, productPrice = ?  WHERE productCode = ?`;
    await this.updateQuery(sql, args);
  }
  async deleteProduct(args) {
    const sql = `DELETE FROM products WHERE productCode = ?`;
    await this.deleteQuery(sql, args);
  }
  async selectAllProducts() {
    const sql = `SELECT * FROM products`;
    const products = await this.selectQuery(sql, []);
    return products;
  }
}
