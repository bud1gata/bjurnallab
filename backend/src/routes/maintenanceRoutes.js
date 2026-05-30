import express from 'express';
import { getMaintenances, createMaintenance } from '../controllers/maintenanceController.js';

const router = express.Router();

router.route('/').get(getMaintenances).post(createMaintenance);

export default router;
