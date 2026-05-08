const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Send a message
router.post('/', async (req, res) => {
  try {
    const { sender, senderModel, receiver, receiverModel, content } = req.body;
    const newMessage = new Message({
      sender,
      senderModel,
      receiver,
      receiverModel,
      content
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Delete a specific message
router.delete('/:messageId', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    const currentUserId = req.user.teacher?.id || req.user.student?.id || req.user.id;
    
    // Only sender or receiver can delete? The user said "if I have sent any inappropriate message ... there is an option to delete that"
    // So usually sender can delete for everyone.
    if (message.sender.toString() !== currentUserId && message.receiver.toString() !== currentUserId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await Message.findByIdAndDelete(req.params.messageId);
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Clear entire conversation between two users
router.delete('/conversation/:userId1/:userId2', auth, async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const currentUserId = req.user.teacher?.id || req.user.student?.id || req.user.id;

    if (userId1 !== currentUserId && userId2 !== currentUserId) {
        return res.status(401).json({ message: 'Unauthorized to clear this conversation' });
    }

    await Message.deleteMany({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    });
    res.json({ message: 'Conversation cleared successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
