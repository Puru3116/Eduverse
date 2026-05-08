const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: false },
  isGoogleAuth: { type: Boolean, default: false },
  googleId: { type: String, required: false },
  schoolName: { type: String },
  classGrade: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  bio: { type: String, default: '' },
  allowStudentMessages: { type: Boolean, default: true },
  autoApproveJoinRequests: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
