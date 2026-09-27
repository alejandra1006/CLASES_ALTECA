import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

try {
    const connection = await pool.getConnection();
    console.log('conexion exitosa a la base de datos');
    connection.release();
} catch (error) {
    console.error('error al conectar a la base de datos:', error.message);
}

export default pool;