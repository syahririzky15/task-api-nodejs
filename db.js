const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // jika XAMPP default kosong
  database: "task_api"
});

module.exports = pool.promise();