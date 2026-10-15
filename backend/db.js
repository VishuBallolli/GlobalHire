// Import the promise-based version of mysql2
// This allows us to use async/await instead of callbacks
const mysql = require('mysql2/promise');

// Create a connection pool
// A pool manages multiple database connections efficiently
// Instead of opening/closing connections repeatedly, it reuses them
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',        // Database server address
    port: process.env.DB_PORT || 3306,               // MySQL default port
    user: process.env.DB_USER,                       // Database username (must be set)
    password: process.env.DB_PASSWORD,               // Database password (must be set)
    database: process.env.DB_NAME || 'globalhire_db', // Database name
    waitForConnections: true,                        // Wait if no connections available
    connectionLimit: 10,                             // Maximum 10 connections in pool
    queueLimit: 0                                    // No limit on queued requests
});

// Export the pool so other files can use it
module.exports = pool;
