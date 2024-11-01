import { Database } from "./base.js";
export class OrderProducts extends Database {
  constructor() {
    super();
  }
  async structureOrderProductsTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS order_products (
      order_id INTEGER REFERENCES orders(ordercode) ON DELETE CASCADE,
      product_id SMALLINT REFERENCES products(productCode) ON DELETE CASCADE,
      quantity INTEGER DEFAULT 1,
      PRIMARY KEY (order_id, product_id)
    );`;
    return await this.query(sql, []);
  }
  async insertOrderProduct(order_id, product_id, quantity) {
    const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)`;
    return await this.query(sql, [order_id, product_id, quantity]);
  }
  async deleteOrderProducts(order_id) {
    const sql = `DELETE FROM order_products WHERE order_id = $1`;
    return await this.query(sql, [order_id]);
  }
  async selectOrderWithProducts(month) {
    const sql = `
    SELECT 
      o.ordercode, 
      o.ordername, 
      o.orderprice,
      TO_CHAR(o.createdAt, 'DD/MM/YYYY') AS createdAt,
      STRING_AGG(
        p.productName || ' (' || op.quantity || ')', ', ' ORDER BY op.quantity
      ) AS productnames,
      SUM(op.quantity) AS totalquantity
    FROM orders o
    JOIN order_products op ON o.ordercode = op.order_id
    JOIN products p ON op.product_id = p.productCode
    WHERE EXTRACT(MONTH FROM o.createdAt) = $1
    GROUP BY o.ordercode, o.ordername, o.orderprice, o.createdAt
    ORDER BY o.ordercode;
  `;
    const result = await this.query(sql, [month]);
    return result;
  }
}
