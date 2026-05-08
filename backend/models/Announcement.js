const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  attachments: [{
    filename: String,
    url: String,
    size: String
  }]
});

module.exports = mongoose.model('Announcement', announcementSchema);
