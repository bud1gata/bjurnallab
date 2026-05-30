import Inventory from '../models/Inventory.js';

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Public
export const getInventories = async (req, res) => {
    try {
        const inventories = await Inventory.find({});
        res.json(inventories);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// @desc    Get single inventory item
// @route   GET /api/inventory/:id
// @access  Public
export const getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (inventory) {
            res.json(inventory);
        } else {
            res.status(404).json({ message: 'Item inventaris tidak ditemukan' });
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// @desc    Create new inventory item
// @route   POST /api/inventory
// @access  Public (Will be protected for Admin later)
export const createInventory = async (req, res) => {
    try {
        const { name, code, category, type, quantity, merk, status } = req.body;
        
        const itemExists = await Inventory.findOne({ code });
        if (itemExists) {
            return res.status(400).json({ message: 'Kode barang sudah digunakan' });
        }

        const inventory = await Inventory.create({
            name, code, category, type, quantity, merk, status
        });

        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Public
export const updateInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        
        if (inventory) {
            inventory.name = req.body.name || inventory.name;
            inventory.category = req.body.category || inventory.category;
            inventory.type = req.body.type || inventory.type;
            inventory.quantity = req.body.quantity !== undefined ? req.body.quantity : inventory.quantity;
            inventory.merk = req.body.merk || inventory.merk;
            inventory.status = req.body.status || inventory.status;
            
            const updatedInventory = await inventory.save();
            res.json(updatedInventory);
        } else {
            res.status(404).json({ message: 'Item tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Public
export const deleteInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        
        if (inventory) {
            await inventory.deleteOne();
            res.json({ message: 'Item berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Item tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
