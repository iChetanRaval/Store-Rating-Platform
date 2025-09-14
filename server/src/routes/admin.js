import express from 'express';
import bcrypt from 'bcrypt';
import { query } from '../lib/db.js';
import { addUserSchema, addStoreSchema } from '../lib/validators.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate, authorize('admin'));

router.post('/add-user', async (req, res) => {
	const { error, value } = addUserSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { name, email, address, password, role } = value;
	try {
		const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
		if (existing.length) return res.status(409).json({ message: 'Email already in use' });
		const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS || 10));
		const result = await query('INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)', [name, email, hash, address || null, role]);
		return res.status(201).json({ id: result.insertId });
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

router.post('/add-store', async (req, res) => {
	const { error, value } = addStoreSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { name, email, address, ownerId } = value;
	try {
		if (ownerId) {
			const owners = await query('SELECT id FROM users WHERE id = ? AND role = "owner"', [ownerId]);
			if (!owners.length) return res.status(400).json({ message: 'Owner not found or invalid' });
		}
		const result = await query('INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)', [name, email || null, address || null, ownerId || null]);
		return res.status(201).json({ id: result.insertId });
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

router.get('/dashboard', async (req, res) => {
	try {
		const [usersCountRows, storesCountRows, ratingsCountRows] = await Promise.all([
			query('SELECT COUNT(*) AS totalUsers FROM users'),
			query('SELECT COUNT(*) AS totalStores FROM stores'),
			query('SELECT COUNT(*) AS totalRatings FROM ratings'),
		]);
		const totalUsers = usersCountRows[0]?.totalUsers || 0;
		const totalStores = storesCountRows[0]?.totalStores || 0;
		const totalRatings = ratingsCountRows[0]?.totalRatings || 0;
		return res.json({ totalUsers, totalStores, totalRatings });
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

function buildListQuery(base, req) {
	const { name, email, address, role, sortBy, sortDir } = req.query;
	const filters = [];
	const params = [];
	if (name) { filters.push(`${base.alias}.name LIKE ?`); params.push(`%${name}%`); }
	if (email && base.email) { filters.push(`${base.alias}.email LIKE ?`); params.push(`%${email}%`); }
	if (address && base.address) { filters.push(`${base.alias}.address LIKE ?`); params.push(`%${address}%`); }
	if (role && base.role) { filters.push(`${base.alias}.role = ?`); params.push(role); }
	const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
	const validSort = (field) => base.sortable.includes(field) ? field : base.sortable[0];
	const field = validSort(sortBy);
	const dir = (String(sortDir).toUpperCase() === 'DESC') ? 'DESC' : 'ASC';
	return { where, params, order: `ORDER BY ${base.alias}.${field} ${dir}` };
}

router.get('/users', async (req, res) => {
	try {
		const base = { alias: 'u', email: true, address: true, role: true, sortable: ['name', 'email', 'role'] };
		const { where, params, order } = buildListQuery(base, req);
		const rows = await query(`SELECT u.id, u.name, u.email, u.address, u.role FROM users u ${where} ${order}`, params);
		return res.json(rows);
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

router.get('/stores', async (req, res) => {
	try {
		const base = { alias: 's', email: true, address: true, role: false, sortable: ['name', 'email'] };
		const { where, params, order } = buildListQuery(base, req);
		const rows = await query(`
			SELECT s.id, s.name, s.email, s.address, s.owner_id AS ownerId,
				COALESCE(AVG(r.rating), 0) AS averageRating,
				COUNT(r.id) AS totalRatings
			FROM stores s
			LEFT JOIN ratings r ON r.store_id = s.id
			${where}
			GROUP BY s.id ${order}
		`, params);
		return res.json(rows);
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

export default router;
