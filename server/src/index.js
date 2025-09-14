import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createPool } from './lib/db.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import storeRoutes from './routes/stores.js';
import ownerRoutes from './routes/owner.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// DB pool initialization (ensures early failure if misconfigured)
createPool();

app.get('/', (req, res) => {
	res.json({ name: 'store-rating-api', status: 'ok' });
});

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/stores', storeRoutes);
app.use('/owner', ownerRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ message: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
