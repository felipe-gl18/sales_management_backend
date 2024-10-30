import sqlite3 from "sqlite3";
import { SQLITE } from "./db.js";
export class OrderTemporary extends SQLITE {
  constructor(db, allow = sqlite3.OPEN_READWRITE) {
    super(db, allow);
  }
  async structureOrderTemporaryTable() {
    const sql = `CREATE TABLE IF NOT EXISTS orderTemporarys (
        orderTemporaryCode INTEGER PRIMARY KEY AUTOINCREMENT,
        orderTemporaryName TEXT NOT NULL,
        orderTemporaryPrice REAL NOT NULL,
        createdAt TEXT NOT NULL
      )`;
    await this.structure(sql);
  }
  async insertOrderTemporary(args) {
    const sql = `INSERT INTO orderTemporarys (orderTemporaryName, orderTemporaryPrice, createdAt) VALUES (?, ?, ?)`;
    return await this.insertQuery(sql, args);
  }
  async updateOrderTemporary(args) {
    const sql = `UPDATE orderTemporarys SET orderTemporaryName = ?, orderTemporaryPrice = ?, createdAt = ?  WHERE orderTemporaryCode = ?`;
    return await this.updateQuery(sql, args);
  }
  async deleteOrderTemporary(args) {
    const sql = `DELETE FROM orderTemporarys WHERE orderTemporaryCode = ?`;
    return await this.deleteQuery(sql, args);
  }
  async selectAllOrderTemporarys() {
    const sql = `SELECT * FROM orderTemporarys`;
    const orderTemporarys = await this.selectQuery(sql, []);
    return orderTemporarys;
  }
}
