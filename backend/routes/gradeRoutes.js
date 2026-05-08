const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// Get all grades for a class
router.get('/class/:classGrade', async (req, res) => {
  try {
    const grades = await Grade.find().populate('studentId');
    // Filter by student's classGrade
    const filteredGrades = grades.filter(g => g.studentId && g.studentId.classGrade === req.params.classGrade);
    res.json(filteredGrades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upsert a grade (Create or Update)
router.post('/upsert', async (req, res) => {
  const { studentId, subject, score, term, isManual } = req.body;
  try {
    const grade = await Grade.findOneAndUpdate(
      { studentId, subject, term },
      { score, isManual, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json(grade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
