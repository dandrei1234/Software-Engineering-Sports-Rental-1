const mysql = require('mysql2/promise');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'softeng_sports_equip_rental'
};

const pool = mysql.createPool(dbConfig);
module.exports.pool = pool;