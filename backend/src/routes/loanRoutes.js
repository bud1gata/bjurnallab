import express from 'express';
import { getLoans, createLoan, updateLoanStatus } from '../controllers/loanController.js';

const router = express.Router();

router.route('/').get(getLoans).post(createLoan);
router.route('/:id').put(updateLoanStatus);

export default router;
