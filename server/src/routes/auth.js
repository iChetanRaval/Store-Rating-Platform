import express from 'express';
import bcrypt from 'bcrypt';
import { query } from '../lib/db.js';
import { signupSchema, loginSchema, updatePasswordSchema } from '../lib/validators.js';
import { authenticate, signToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { error, value } = signupSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { name, email, address, password } = value;
	try {
		const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
		if (existing.length) return res.status(409).json({ message: 'Email already in use' });
		const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
		const hash = await bcrypt.hash(password, saltRounds);
		const result = await query('INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)', [name, email, hash, address || null, 'user']);
		const user = { id: result.insertId, name, email, role: 'user' };
		const token = signToken(user);
		return res.status(201).json({ token, user });
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

router.post('/login', async (req, res) => {
	const { error, value } = loginSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { email, password } = value;
	try {
		const users = await query('SELECT id, name, email, password, role FROM users WHERE email = ?', [email]);
		if (!users.length) return res.status(401).json({ message: 'Invalid credentials' });
		const user = users[0];
		const ok = await bcrypt.compare(password, user.password);
		if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
		const token = signToken(user);
		return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

router.post('/update-password', authenticate, async (req, res) => {
	const { error, value } = updatePasswordSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.message });
	const { oldPassword, newPassword } = value;
	try {
		const rows = await query('SELECT id, password FROM users WHERE id = ?', [req.user.id]);
		if (!rows.length) return res.status(404).json({ message: 'User not found' });
		const ok = await bcrypt.compare(oldPassword, rows[0].password);
		if (!ok) return res.status(400).json({ message: 'Old password incorrect' });
		const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
		const hash = await bcrypt.hash(newPassword, saltRounds);
		await query('UPDATE users SET password = ? WHERE id = ?', [hash, req.user.id]);
		return res.json({ message: 'Password updated' });
	} catch (err) {
		return res.status(500).json({ message: 'Server error' });
	}
});

export default router;
