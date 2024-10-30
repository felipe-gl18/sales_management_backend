import sqlite3 from "sqlite3";
export class SQLITE {
  constructor(db, allow) {
    this.db = new sqlite3.Database(db, allow);
  }
  async structure(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
  async selectQuery(sql, args) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, args, (error, rows) => {
        if (error) reject(error);
        resolve(rows);
      });
    });
  }
  async insertQuery(sql, args) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, args, function (error) {
        if (error) reject(error);
        resolve(this.lastID);
      });
    });
  }
  async deleteQuery(sql, args) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, args, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
  async updateQuery(sql, args) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, args, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
}
