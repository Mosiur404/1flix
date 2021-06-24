const mysql = require("mysql2/promise");
const config = require("config");
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: config.get("host"),
  port: config.get("port"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
  charset: config.get("charset"),
  debug: config.get("debug"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
