import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    className: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    studentCount: {
        type: Number,
        required: true,
    },
    timeIn: {
        type: Date,
    },
    timeOut: {
        type: Date,
    },
    materialsUsed: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory'
        },
        quantity: Number
    }],
    damageReport: {
        type: String,
        default: '',
    }
}, { timestamps: true });

export default mongoose.model('Journal', journalSchema);
