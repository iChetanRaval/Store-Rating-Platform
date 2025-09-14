import mysql from 'mysql2/promise';

let pool;

export function createPool() {
	if (pool) return pool;
	pool = mysql.createPool({
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT || 3306),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	});
	return pool;
}

export function getPool() {
	if (!pool) {
		return createPool();
	}
	return pool;
}

export async function query(sql, params) {
	const p = getPool();
	const [rows] = await p.execute(sql, params);
	return rows;
}
