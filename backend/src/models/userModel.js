const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const createUserTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    );
  `;
  db.run(queryText);
};

createUserTable();

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    db.all(text, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ rows });
      }
    });
  });
};

const run = (text, params) => {
  return new Promise((resolve, reject) => {
    db.run(text, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
};

module.exports = { query, run };