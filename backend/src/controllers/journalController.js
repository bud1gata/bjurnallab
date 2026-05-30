import Journal from '../models/Journal.js';

// @desc    Get all journals
// @route   GET /api/journal
// @access  Public
export const getJournals = async (req, res) => {
    try {
        const journals = await Journal.find({}).sort({ createdAt: -1 });
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new journal entry
// @route   POST /api/journal
// @access  Public
export const createJournal = async (req, res) => {
    try {
        const { teacher, className, subject, topic, studentCount, materialsUsed, damageReport, timeIn, timeOut } = req.body;
        
        const journal = await Journal.create({
            teacher,
            className,
            subject,
            topic,
            studentCount,
            materialsUsed,
            damageReport,
            timeIn,
            timeOut
        });

        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
