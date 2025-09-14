import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { query } from '../lib/db.js';

const router = express.Router();

router.use(authenticate, authorize('owner'));

router.get('/dashboard', async (req, res) => {
	try {
		const stores = await query('SELECT id, name FROM stores WHERE owner_id = ?', [req.user.id]);
		if (!stores.length) return res.json({ stores: [] });
		const storeIds = stores.map(s => s.id);
		const placeholders = storeIds.map(() => '?').join(',');
		const rows = await query(`
			SELECT r.store_id AS storeId, u.id AS userId, u.name, u.email, r.rating
			FROM ratings r
			JOIN users u ON u.id = r.user_id
			WHERE r.store_id IN (${placeholders})
		`, storeIds);
		const averages = await query(`
			SELECT r.store_id AS storeId, AVG(r.rating) AS averageRating, COUNT(*) AS count
			FROM ratings r WHERE r.store_id IN (${placeholders}) GROUP BY r.store_id
		`, storeIds);
		const avgMap = new Map(averages.map(a => [a.storeId, { averageRating: Number(a.averageRating) || 0, count: a.count }]));
		const grouped = stores.map(s => ({
			storeId: s.id,
			storeName: s.name,
			averageRating: avgMap.get(s.id)?.averageRating || 0,
			count: avgMap.get(s.id)?.count || 0,
			ratings: rows.filter(r => r.storeId === s.id),
		}));
		res.json({ stores: grouped });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

export default router;
