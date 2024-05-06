// db.js
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'it_support',
    connectionLimit: 10 // Adjust as needed
});

module.exports = pool;

// Create a MySQL connection pool

// module.exports = {
//     query: function(sql) {
//         return new Promise((resolve, reject) => {
//             pool.query(sql, (error, results) => {
//                 if (error) {
//                     console.error('Error executing query:', error);
//                     reject(error);
//                     return;
//                 }
//                 console.log('Query results:', results);
//                 resolve(results);
//             });
//         });
//     }
// };

