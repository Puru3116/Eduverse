const express = require('express');
const router = express.Router();
const TeacherGroupMessage = require('../models/TeacherGroupMessage');
const auth = require('../middleware/auth');

// Send a message to the group
router.post('/', auth, async (req, res) => {
  try {
    const { content, classGrade } = req.body;
    const senderId = req.user.teacher?.id || req.user.id;

    if (!senderId) {
      return res.status(401).json({ message: 'Unauthorized: No sender ID found in token' });
    }

    const newMessage = new TeacherGroupMessage({
      sender: senderId,
      classGrade: classGrade || '1',
      content
    });

    await newMessage.save();
    
    const populatedMessage = await TeacherGroupMessage.findById(newMessage._id).populate('sender', 'name profileImage');
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get all messages for a class grade group
router.get('/:classGrade', auth, async (req, res) => {
  try {
    const { classGrade } = req.params;
    const messages = await TeacherGroupMessage.find({ classGrade })
      .populate('sender', 'name profileImage')
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Delete a specific group message
router.delete('/:messageId', auth, async (req, res) => {
  try {
    const message = await TeacherGroupMessage.findById(req.params.messageId);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    // Optional: check if sender is deleting their own message
    const senderId = req.user.teacher?.id || req.user.id;
    if (message.sender.toString() !== senderId) {
       return res.status(401).json({ message: 'Unauthorized to delete this message' });
    }

    await TeacherGroupMessage.findByIdAndDelete(req.params.messageId);
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Clear entire group chat for a class grade
router.delete('/group/:classGrade', auth, async (req, res) => {
  try {
    const { classGrade } = req.params;
    await TeacherGroupMessage.deleteMany({ classGrade });
    res.json({ message: 'Group chat cleared successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
