const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  moduleName: { type: String, required: true },
  gameId: { type: String, required: true },
  levelNumber: { type: Number, default: 1 },
  subLevel: { type: Number, default: 1 },
  score: { type: Number, required: true },
  attempts: { type: Number, default: 1 },
  timeSpent: { type: Number, required: true }, // in seconds
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
