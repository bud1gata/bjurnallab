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
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import Inventory from './models/Inventory.js';
import Loan from './models/Loan.js';
import Maintenance from './models/Maintenance.js';
import Journal from './models/Journal.js';

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'B-JURNALLAB API is running' });
});

// Mount Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Dashboard stats endpoint
app.get('/api/stats', async (req, res) => {
    try {
        const totalInventory = await Inventory.countDocuments();
        const rusak = await Inventory.countDocuments({ status: 'Rusak' });
        const dipinjam = await Inventory.countDocuments({ status: 'Dipinjam' });
        const tersedia = await Inventory.countDocuments({ status: 'Tersedia' });
        const perbaikan = await Inventory.countDocuments({ status: 'Perbaikan' });
        const totalLoan = await Loan.countDocuments({ status: 'Dipinjam' });
        const totalMaintenance = await Maintenance.countDocuments();
        const maintenanceCost = await Maintenance.aggregate([{ $group: { _id: null, total: { $sum: '$cost' } } }]);
        const recentJournals = await Journal.find({}).sort({ createdAt: -1 }).limit(5);
        const recentLoans = await Loan.find({}).sort({ createdAt: -1 }).limit(5);

        res.json({
            totalInventory,
            rusak,
            dipinjam,
            tersedia,
            perbaikan,
            totalLoan,
            totalMaintenance,
            maintenanceCost: maintenanceCost[0]?.total || 0,
            recentJournals,
            recentLoans,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
