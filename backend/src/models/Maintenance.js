import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
    },
    itemName: {
        type: String,
        required: true,
    },
    technician: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['Perbaikan', 'Kalibrasi', 'Maintenance Rutin', 'Ganti Suku Cadang'],
        required: true,
    },
    cost: {
        type: Number,
        default: 0,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Proses', 'Selesai', 'Batal'],
        default: 'Proses',
    }
}, { timestamps: true });

export default mongoose.model('Maintenance', maintenanceSchema);
