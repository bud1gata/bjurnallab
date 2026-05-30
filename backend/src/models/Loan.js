import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    borrowerName: {
        type: String,
        required: true,
    },
    borrowerRole: {
        type: String,
        default: '',
    },
    itemName: {
        type: String,
        required: true,
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory'
        },
        quantity: Number
    }],
    requestDate: {
        type: Date,
        default: Date.now,
    },
    expectedReturnDate: {
        type: Date,
        required: true,
    },
    actualReturnDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Menunggu', 'Dipinjam', 'Dikembalikan', 'Ditolak'],
        default: 'Menunggu',
    },
    returnCondition: {
        type: String,
        enum: ['Baik', 'Rusak/Hilang', 'Belum Kembali'],
        default: 'Belum Kembali',
    },
    notes: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('Loan', loanSchema);
