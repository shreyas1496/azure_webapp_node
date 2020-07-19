import mysql, { Connection, ConnectionConfig } from "mysql";

export class Database {
  private connection: Connection;

  constructor(config: ConnectionConfig) {
    this.connection = mysql.createConnection(config);
  }

  query(sql: string, args = {}) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}
