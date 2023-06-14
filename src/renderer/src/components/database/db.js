// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./database.sqlite.db');

// export default db;
const { AsyncDatabase } = require("promised-sqlite3");
const db = await AsyncDatabase.open("./database.sqlite.db");
db.inner.on("trace", (sql) => console.log("[TRACE]", sql));

export default db;