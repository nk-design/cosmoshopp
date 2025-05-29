import Database from 'better-sqlite3';

const db = new Database('./products.db', { verbose: console.log });

export default db;
