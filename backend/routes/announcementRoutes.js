const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Create a broadcast
router.post('/', async (req, res) => {
  try {
    const { teacher, title, content, attachments } = req.body;
    const newAnnouncement = new Announcement({
      teacher,
      title,
      content,
      attachments
    });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get all broadcasts
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('teacher', 'firstName lastName name')
      .sort({ timestamp: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
