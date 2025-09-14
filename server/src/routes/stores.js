import express from 'express';
import { query } from '../lib/db.js';
import { authenticate } from '../middleware/auth.js';
import { rateSchema } from '../lib/validators.js';

const router = express.Router();

router.get('/list', async (req, res) => {
	try {
		const rows = await query(`
			SELECT s.id, s.name, s.address,
				COALESCE(AVG(r.rating), 0) AS averageRating,
				COUNT(r.id) AS totalRatings
			FROM stores s
			LEFT JOIN ratings r ON r.store_id = s.id
			GROUP BY s.id
			ORDER BY s.name ASC
		`);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

router.get('/search', async (req, res) => {
	const { name, address } = req.query;
	try {
		const filters = [];
		const params = [];
		if (name) { filters.push('s.name LIKE ?'); params.push(`%${name}%`); }
		if (address) { filters.push('s.address LIKE ?'); params.push(`%${address}%`); }
		const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
		const rows = await query(`
			SELECT s.id, s.name, s.address,
				COALESCE(AVG(r.rating), 0) AS averageRating,
				COUNT(r.id) AS totalRatings
			FROM stores s
			LEFT JOIN ratings r ON r.store_id = s.id
			${where}
			GROUP BY s.id
			ORDER BY s.name ASC
		`, params);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

router.get('/my-ratings', authenticate, async (req, res) => {
	try {
		const rows = await query('SELECT store_id AS storeId, rating FROM ratings WHERE user_id = ?', [req.user.id]);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/rate', authenticate, async (req, res) => {
	const { error, value } = rateSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { storeId, rating } = value;
	try {
		const existing = await query('SELECT id FROM ratings WHERE user_id = ? AND store_id = ?', [req.user.id, storeId]);
		if (existing.length) return res.status(409).json({ message: 'Rating already exists. Use update-rating.' });
		await query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)', [req.user.id, storeId, rating]);
		res.status(201).json({ message: 'Rated' });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/update-rating', authenticate, async (req, res) => {
	const { error, value } = rateSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { storeId, rating } = value;
	try {
		await query('UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?', [rating, req.user.id, storeId]);
		res.json({ message: 'Updated' });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

export default router;
