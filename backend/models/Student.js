const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: false },
  isGoogleAuth: { type: Boolean, default: false },
  googleId: { type: String, required: false },
  classGrade: { type: String, default: '' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: false },
  hasCompletedPretest: { type: Boolean, default: false },
  profileImage: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
