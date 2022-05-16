const prop = require('../properties')
const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
  host: prop.MySQL_HOST,
  port: prop.MySQL_PORT,
  database: prop.MySQL_DB,
  user: prop.MySQL_USER,
  password: prop.MySQL_PASSWORD
})

module.exports = dbConnection