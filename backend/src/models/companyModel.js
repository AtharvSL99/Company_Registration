const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const createCompanyTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      company_name TEXT NOT NULL,
      registration_number TEXT UNIQUE NOT NULL,
      address TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.run(queryText);
};

createCompanyTable();

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