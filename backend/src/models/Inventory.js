import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        enum: ['Aset Tetap', 'Bahan Habis Pakai'],
        required: true,
    },
    type: {
        type: String,
        enum: ['Komputer', 'Jaringan', 'Alat Praktik'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Tersedia', 'Dipinjam', 'Rusak', 'Perbaikan'],
        default: 'Tersedia',
    },
    quantity: {
        type: Number,
        default: 1, // Useful for 'Bahan Habis Pakai'
    },
    merk: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Inventory', inventorySchema);
