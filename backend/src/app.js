import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import inventoryRoutes from './routes/inventoryRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import journalRoutes from './routes/journalRoutes.js';

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'B-JURNALLAB API is running' });
});

// Mount Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/journal', journalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

export default app;
