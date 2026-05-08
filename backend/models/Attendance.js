const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  date: {
    type: String, // Store as YYYY-MM-DD for easy querying
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'on-leave'],
    required: true
  },
  markedBy: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure one attendance record per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
