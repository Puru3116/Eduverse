const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_eduverse_key';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, schoolName, classGrade } = req.body;

    const isStudent = await Student.findOne({ email });
    if (isStudent) {
      return res.status(400).json({ message: 'The mail id is already used in student portal you can not login with this id' });
    }

    let teacher = await Teacher.findOne({ email });

    if (teacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    teacher = new Teacher({ name, email, passwordHash, schoolName: schoolName || 'Default School', classGrade: classGrade || '' });
    await teacher.save();

    const payload = { teacher: { id: teacher.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, teacherId: teacher.id, teacher: { id: teacher.id, name: teacher.name, email: teacher.email, classGrade: teacher.classGrade, schoolName: teacher.schoolName } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const isStudent = await Student.findOne({ email });
    if (isStudent) {
      return res.status(400).json({ message: 'The mail id is already used in student portal you can not login with this id' });
    }

    let teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, teacher.passwordHash);
    if (!isMatch) {
       return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { teacher: { id: teacher.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, teacherId: teacher.id, teacher: { id: teacher.id, name: teacher.name, email: teacher.email, classGrade: teacher.classGrade, schoolName: teacher.schoolName } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all teachers (for student messaging)
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find({}, 'name email classGrade schoolName');
    res.json(teachers);
  } catch (err) {
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

    const isStudent = await Student.findOne({ email });
    if (isStudent) {
      return res.status(400).json({ message: 'The mail id is already used in student portal you can not login with this id' });
    }

    // Check if teacher exists
    let teacher = await Teacher.findOne({ email });

    if (action === 'register') {
      if (teacher) {
        return res.status(400).json({ message: 'Account already exists. Please sign in instead.' });
      }
      // Register new Google teacher
      teacher = new Teacher({
        name: given_name + ' ' + (family_name || ''),
        email: email,
        isGoogleAuth: true,
        googleId: googleId,
        schoolName: 'Google Linked School',
        classGrade: classGrade || ''
      });
      await teacher.save();
    } else if (action === 'login') {
      if (!teacher) {
        return res.status(400).json({ message: 'Account not found. Please sign up first.' });
      }
      if (!teacher.isGoogleAuth) {
        // Link Google account to existing user
        teacher.isGoogleAuth = true;
        teacher.googleId = googleId;
        await teacher.save();
      }
    } else {
      return res.status(400).json({ message: 'Invalid action specified.' });
    }

    // Generate JWT
    const jwtPayload = { teacher: { id: teacher.id } };
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, teacherId: teacher.id, teacher: { id: teacher.id, name: teacher.name, email: teacher.email, classGrade: teacher.classGrade, schoolName: teacher.schoolName } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/auth/teacher/:id
// @desc    Update teacher profile
// @access  Private
router.put('/teacher/:id', auth, async (req, res) => {
  try {
    const { firstName, lastName, profileImage, bio, allowStudentMessages, autoApproveJoinRequests } = req.body;
    let teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Ensure user is updating their own profile
    const userId = req.user.teacher?.id || req.user.id;
    if (teacher._id.toString() !== userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (firstName || lastName) {
      teacher.name = `${firstName || teacher.name.split(' ')[0]} ${lastName || teacher.name.split(' ').slice(1).join(' ')}`.trim();
    }
    if (profileImage !== undefined) teacher.profileImage = profileImage;
    if (bio !== undefined) teacher.bio = bio;
    if (allowStudentMessages !== undefined) teacher.allowStudentMessages = allowStudentMessages;
    if (autoApproveJoinRequests !== undefined) teacher.autoApproveJoinRequests = autoApproveJoinRequests;

    await teacher.save();

    res.json({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      schoolName: teacher.schoolName,
      classGrade: teacher.classGrade,
      profileImage: teacher.profileImage,
      bio: teacher.bio,
      allowStudentMessages: teacher.allowStudentMessages,
      autoApproveJoinRequests: teacher.autoApproveJoinRequests
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/auth/teacher/:id/password
// @desc    Update teacher password
// @access  Private
router.put('/teacher/:id/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    let teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Ensure user is updating their own password
    const userId = req.user.teacher?.id || req.user.id;
    if (teacher._id.toString() !== userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Check if teacher is google auth
    if (teacher.isGoogleAuth && !teacher.passwordHash) {
      // If they don't have a password yet (only Google), we don't need current password
      if (currentPassword) {
         return res.status(400).json({ message: 'You logged in with Google. No current password exists.' });
      }
    } else {
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, teacher.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    teacher.passwordHash = await bcrypt.hash(newPassword, salt);
    
    await teacher.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
