import sqlite3 from "sqlite3";
import { SQLITE } from "./db.js";
export class Order extends SQLITE {
  constructor(db, allow = sqlite3.OPEN_READWRITE) {
    super(db, allow);
  }
  async structureOrderTable() {
    const sql = `CREATE TABLE IF NOT EXISTS orders (
        orderCode INTEGER PRIMARY KEY AUTOINCREMENT,
        orderName TEXT NOT NULL,
        orderPrice REAL NOT NULL,
        createdAt TEXT NOT NULL
      )`;
    await this.structure(sql);
  }
  async insertOrder(args) {
    const sql = `INSERT INTO orders (orderName, orderPrice, createdAt) VALUES (?, ?, ?)`;
    return await this.insertQuery(sql, args);
  }
  async updateOrder(args) {
    const sql = `UPDATE orders SET orderName = ?, orderPrice = ?, createdAt = ?  WHERE orderCode = ?`;
    return await this.updateQuery(sql, args);
  }
  async deleteOrder(args) {
    const sql = `DELETE FROM orders WHERE orderCode = ?`;
    return await this.deleteQuery(sql, args);
  }
  async selectAllOrders() {
    const sql = `SELECT * FROM orders`;
    const orders = await this.selectQuery(sql, []);
    return orders;
  }
}
