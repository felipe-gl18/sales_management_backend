import sqlite3 from "sqlite3";
import { SQLITE } from "./db.js";
export class OrderProducts extends SQLITE {
  constructor(db, allow = sqlite3.OPEN_READWRITE) {
    super(db, allow);
  }
  async structureOrderProductsTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS order_products (
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      PRIMARY KEY (order_id, product_id),
      FOREIGN KEY (order_id) REFERENCES orders(orderCode) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(productCode) ON DELETE CASCADE
    )`;
    await this.structure(sql);
  }
  async insertOrderProduct(args) {
    const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)`;
    await this.insertQuery(sql, args);
  }
  async deleteOrderProducts(args) {
    const sql = `DELETE FROM order_products WHERE order_id = ?`;
    return await this.deleteQuery(sql, args);
  }
  async selectOrderWithProducts() {
    const sql = `
      SELECT 
        o.orderCode, 
        o.orderName, 
        o.orderPrice,
        o.createdAt,
        GROUP_CONCAT(
          TRIM(REPLACE(printf('%0*d', op.quantity, ''), '0', p.productName || ', ')), ''
        ) AS productNames,
        SUM(op.quantity) AS totalQuantity
      FROM orders o
      JOIN order_products op ON o.orderCode = op.order_id
      JOIN products p ON op.product_id = p.productCode
      GROUP BY o.orderCode, o.orderName, o.orderPrice, o.createdAt
      ORDER BY o.orderCode;
    `;
    const result = await this.selectQuery(sql, []);
    return result;
  }
}
