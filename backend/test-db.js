// Load environment variables from the .env file in the same directory
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import the connection pool from db.js
const pool = require('./db');

// Async function to test the database connection
async function testConnection() {
    try {
        // Execute a simple query to check which database we're connected to
        const [rows] = await pool.query('SELECT DATABASE() AS databaseName');
        
        // Print success message with the database name
        console.log('✅ Database connection successful!');
        console.log('📊 Connected to database:', rows[0].databaseName);
        
    } catch (error) {
        // Print error message without exposing sensitive information
        console.error('❌ Database connection failed!');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        
        // Provide helpful troubleshooting hints
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Make sure MySQL server is running (check XAMPP)');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 Check your DB_USER and DB_PASSWORD in .env file');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 Database does not exist. Create it first in MySQL.');
        }
        
    } finally {
        // Always close the connection pool when done
        await pool.end();
        console.log('🔌 Connection pool closed.');
    }
}

// Run the test
testConnection();
