const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  moduleName: { type: String, required: true },
  testType: { type: String, enum: ['pre', 'post'], required: true },
  answers: { type: Array, default: [] },
  score: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('TestResult', testResultSchema);
