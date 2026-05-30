import Maintenance from '../models/Maintenance.js';

// @desc    Get all maintenance records
// @route   GET /api/maintenance
// @access  Public
export const getMaintenances = async (req, res) => {
    try {
        const records = await Maintenance.find({}).sort({ date: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new maintenance record
// @route   POST /api/maintenance
// @access  Public
export const createMaintenance = async (req, res) => {
    try {
        const { item, itemName, technician, date, type, cost, notes, status } = req.body;

        const record = await Maintenance.create({
            item, itemName, technician, date, type, cost, notes, status
        });

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
