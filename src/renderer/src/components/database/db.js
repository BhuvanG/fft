// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./database.sqlite.db');

// export default db;

import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  friends: '++id, name, age', // Primary key and indexed props
});
