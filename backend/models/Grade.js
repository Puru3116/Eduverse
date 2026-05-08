const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true }, // 'math', 'english', 'science'
  term: { type: String, default: 'Term 1' },
  score: { type: Number, required: true },
  isManual: { type: Boolean, default: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
}, { timestamps: true });

// Ensure unique grade per student per subject per term
gradeSchema.index({ studentId: 1, subject: 1, term: 1 }, { unique: true });

module.exports = mongoose.model('Grade', gradeSchema);
