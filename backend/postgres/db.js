const Pool = require("pg").Pool;
require('dotenv').config()

//establishing connection with the database
const pool = new Pool();

module.exports = pool;