import express from 'express';
import {
    getInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
} from '../controllers/inventoryController.js';

const router = express.Router();

router.route('/').get(getInventories).post(createInventory);
router.route('/:id').get(getInventoryById).put(updateInventory).delete(deleteInventory);

export default router;
