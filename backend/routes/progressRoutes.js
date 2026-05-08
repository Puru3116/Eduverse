const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const mongoose = require('mongoose');

// Save or Update Game Progress
router.post('/', async (req, res) => {
  try {
    const { studentId, moduleName, gameId, levelNumber, subLevel, score, attempts, timeSpent } = req.body;

    let progress = new Progress({
      studentId: new mongoose.Types.ObjectId(studentId),
      moduleName,
      gameId,
      levelNumber,
      subLevel,
      score,
      attempts,
      timeSpent
    });

    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get Progress by Student ID
router.get('/:studentId', async (req, res) => {
  try {
    const progressRecords = await Progress.find({ studentId: req.params.studentId }).sort({ timestamp: -1 });
    res.json(progressRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get ALL Progress across all students (for Teacher Dashboard)
router.get('/class/all', async (req, res) => {
  try {
    const allRecords = await Progress.find().sort({ timestamp: -1 }).populate('studentId', 'name classGrade');
    res.json(allRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Basic Analytics Endpoint (can be expanded for teacher dashboard)
router.get('/analytics/:studentId', async (req, res) => {
  try {
    const records = await Progress.find({ studentId: req.params.studentId });
    // aggregate stats
    const totalTime = records.reduce((acc, curr) => acc + curr.timeSpent, 0);
    const avgScore = records.length > 0 ? (records.reduce((acc, curr) => acc + curr.score, 0) / records.length) : 0;
    
    res.json({ totalTime, avgScore, totalGamesPlayed: records.length });
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Progress for a specific game
router.delete('/:studentId/:gameId', async (req, res) => {
  try {
    const { studentId, gameId } = req.params;
    await Progress.deleteMany({ 
      studentId: new mongoose.Types.ObjectId(studentId), 
      gameId 
    });
    res.json({ message: 'Progress reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
