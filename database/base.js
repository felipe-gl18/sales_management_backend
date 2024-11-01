import pg from "pg";
import "dotenv/config.js";
const { Pool } = pg;
export class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async query(sql, params) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  async close() {
    await this.pool.end();
  }
}
