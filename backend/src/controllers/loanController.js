import Loan from '../models/Loan.js';

// @desc    Get all loans
// @route   GET /api/loan
// @access  Public
export const getLoans = async (req, res) => {
    try {
        // In real app, we use .populate('borrower') and .populate('items.item')
        const loans = await Loan.find({});
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new loan request
// @route   POST /api/loan
// @access  Public
export const createLoan = async (req, res) => {
    try {
        const { borrower, borrowerName, borrowerRole, itemName, items, expectedReturnDate, notes } = req.body;
        
        const loan = await Loan.create({
            borrower,
            borrowerName,
            borrowerRole,
            itemName,
            items,
            expectedReturnDate,
            notes
        });

        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update loan status (approve, return, reject)
// @route   PUT /api/loan/:id
// @access  Public
export const updateLoanStatus = async (req, res) => {
    try {
        const { status, returnCondition, actualReturnDate } = req.body;
        const loan = await Loan.findById(req.params.id);
        
        if (loan) {
            loan.status = status || loan.status;
            loan.returnCondition = returnCondition || loan.returnCondition;
            if (actualReturnDate) loan.actualReturnDate = actualReturnDate;
            
            const updatedLoan = await loan.save();
            res.json(updatedLoan);
        } else {
            res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
