require('dotenv').config();

// General settings
exports.BASE_DIR     = __dirname
exports.port         = 5000
exports.datetime     = new Date();
exports.cookie       = process.env.COOKIE_SECRET

// MySQL settings
exports.MySQL_HOST     = process.env.MYSQL_HOST
exports.MySQL_PORT     = process.env.MYSQL_PORT
exports.MySQL_DB       = process.env.Database
exports.MySQL_USER     = process.env.MYSQL_USER
exports.MySQL_PASSWORD = process.env.MYSQL_PASSWD

// Proxmox API settings
exports.PROXMOX_HOST        = process.env.PROXMOX_HOST
exports.PROXMOX_NODE        = process.env.PROXMOX_NODE
exports.PROXMOX_TOKEN_HEAD  = process.env.PROXMOX_API_TOKEN_HEAD
exports.PROXMOX_TOKEN_VALUE = process.env.PROXMOX_API_TOKEN_VALUE