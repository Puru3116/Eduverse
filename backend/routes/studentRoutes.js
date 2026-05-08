const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '858816687357-fl3qv2gv2tec2qfh8e66cnl9e75ursr4.apps.googleusercontent.com');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_eduverse_key';

// Register student
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, teacherId, classGrade } = req.body;

    const isTeacher = await Teacher.findOne({ email });
    if (isTeacher) {
      return res.status(400).json({ message: 'The mail id is already used in teacher portal you can not login with this id' });
    }

    let student = await Student.findOne({ email });

    if (student) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    student = new Student({ 
      firstName, 
      lastName, 
      email, 
      passwordHash,
      teacherId: teacherId || undefined,
      classGrade: classGrade || ''
    });
    
    await student.save();

    const payload = { student: { id: student.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        classGrade: student.classGrade,
        hasCompletedPretest: student.hasCompletedPretest,
        profileImage: student.profileImage || '',
        isGoogleAuth: student.isGoogleAuth
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login student
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const isTeacher = await Teacher.findOne({ email });
    if (isTeacher) {
      return res.status(400).json({ message: 'The mail id is already used in teacher portal you can not login with this id' });
    }

    let student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) {
       return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { student: { id: student.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        classGrade: student.classGrade,
        hasCompletedPretest: student.hasCompletedPretest,
        profileImage: student.profileImage || '',
        isGoogleAuth: student.isGoogleAuth
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Google Login/Register
router.post('/google', async (req, res) => {
  try {
    const { credential, action, classGrade } = req.body;
    
    // Fetch user profile using the Google access token
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${credential}` }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile from Google');
    }

    const payload = await response.json();
    const { email, given_name, family_name, sub: googleId } = payload;

    const isTeacher = await Teacher.findOne({ email });
    if (isTeacher) {
      return res.status(400).json({ message: 'The mail id is already used in teacher portal you can not login with this id' });
    }

    // Check if student exists
    let student = await Student.findOne({ email });

    if (action === 'register') {
      if (student) {
        return res.status(400).json({ message: 'Account already exists. Please sign in instead.' });
      }
      // Register new Google student
      student = new Student({
        firstName: given_name || 'Student',
        lastName: family_name || '',
        email: email,
        isGoogleAuth: true,
        googleId: googleId,
        classGrade: classGrade || ''
      });
      await student.save();
    } else if (action === 'login') {
      if (!student) {
        return res.status(400).json({ message: 'Account not found. Please sign up first.' });
      }
      if (!student.isGoogleAuth) {
        // Link Google account to existing user
        student.isGoogleAuth = true;
        student.googleId = googleId;
        await student.save();
      }
    } else {
      return res.status(400).json({ message: 'Invalid action specified.' });
    }

    // Generate JWT
    const jwtPayload = { student: { id: student.id } };
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        classGrade: student.classGrade,
        hasCompletedPretest: student.hasCompletedPretest,
        profileImage: student.profileImage || '',
        isGoogleAuth: student.isGoogleAuth
      }
    });
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    res.status(500).json({ message: 'Google Authentication Failed' });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, classGrade, hasCompletedPretest, profileImage } = req.body;
    let student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (firstName !== undefined) student.firstName = firstName;
    if (lastName !== undefined) student.lastName = lastName;
    if (classGrade !== undefined) student.classGrade = classGrade;
    if (hasCompletedPretest !== undefined) student.hasCompletedPretest = hasCompletedPretest;
    if (profileImage !== undefined) student.profileImage = profileImage;

    await student.save();
    
    res.json({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        classGrade: student.classGrade,
        hasCompletedPretest: student.hasCompletedPretest,
        profileImage: student.profileImage,
        isGoogleAuth: student.isGoogleAuth
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Update student password
router.put('/:id/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!req.params.id || req.params.id === 'undefined') {
        return res.status(400).json({ message: 'Invalid Student ID. Please log out and log in again.' });
    }

    let student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // If it's not a Google account, verify current password
    if (!student.isGoogleAuth) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }
      
      if (!student.passwordHash) {
          // Edge case: isGoogleAuth is false but no password set (shouldn't happen with new logic)
          return res.status(400).json({ message: 'No password set for this account. Please use Google login or contact support.' });
      }

      const isMatch = await bcrypt.compare(currentPassword, student.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    student.passwordHash = await bcrypt.hash(newPassword, salt);
    
    await student.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password Update Error:', err.message);
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid Student ID format. Please log out and log in again.' });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
