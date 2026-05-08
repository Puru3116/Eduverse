const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult');
const Student = require('../models/Student');
const mongoose = require('mongoose');

// Save a test result
router.post('/', async (req, res) => {
  try {
    const { studentId, moduleName, testType, answers, score } = req.body;

    let result = new TestResult({
      studentId: new mongoose.Types.ObjectId(studentId),
      moduleName,
      testType,
      answers,
      score
    });

    await result.save();
    
    // Update student pretest flag
    if (testType === 'pre') {
      await Student.findByIdAndUpdate(studentId, { hasCompletedPretest: true });
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get test results by Student ID
router.get('/:studentId', async (req, res) => {
  try {
    const results = await TestResult.find({ studentId: req.params.studentId }).sort({ timestamp: -1 });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get ALL test results across all students (for Teacher Dashboard)
router.get('/class/all', async (req, res) => {
  try {
    const allResults = await TestResult.find().sort({ timestamp: -1 }).populate('studentId', 'name classGrade');
    res.json(allResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
