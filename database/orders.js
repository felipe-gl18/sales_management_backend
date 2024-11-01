import { Database } from "./base.js";
export class Orders extends Database {
  constructor() {
    super();
  }
  async structureOrderTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS orders (
      ordercode SERIAL PRIMARY KEY,
      ordername VARCHAR(50),
      orderprice DECIMAL(10, 2),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    return await this.query(sql, []);
  }
  async insertOrder(ordername, orderprice, createdAt) {
    const sql = `INSERT INTO orders (ordername, orderprice, createdAt) VALUES ($1, $2, $3) RETURNING ordercode`;
    const result = await this.query(sql, [ordername, orderprice, createdAt]);
    return result[0].ordercode;
  }
  async updateOrder(ordername, orderprice, createdAt, ordercode) {
    const sql = `UPDATE orders SET ordername = $1, orderprice = $2, createdAt = $3  WHERE ordercode = $4`;
    return await this.query(sql, [ordername, orderprice, createdAt, ordercode]);
  }
  async deleteOrder(id) {
    const sql = `DELETE FROM orders WHERE ordercode = $1`;
    return await this.query(sql, [id]);
  }
  async selectAllOrders() {
    const sql = `SELECT * FROM orders`;
    const orders = await this.query(sql, []);
    return orders;
  }
}
