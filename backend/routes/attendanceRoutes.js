const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// @route   GET /api/attendance/today
// @desc    Get today's attendance for the logged-in student
// @access  Private
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const studentId = req.user.student?.id;

    if (!studentId) {
        return res.status(400).json({ message: 'Student ID not found in token' });
    }

    const attendance = await Attendance.findOne({
      studentId: studentId,
      date: today
    });

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/attendance/mark
// @desc    Mark attendance (Student)
// @access  Private
router.post('/mark', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const studentId = req.user.student?.id;

    console.log(`[ATTENDANCE] Mark request for student: ${studentId}, status: ${status}, today: ${today}`);

    if (!studentId) {
        console.log(`[ATTENDANCE] Failed: Student ID not found in token`);
        return res.status(400).json({ message: 'Student ID not found in token' });
    }

    let attendance = await Attendance.findOne({ studentId: studentId, date: today });

    if (attendance) {
      console.log(`[ATTENDANCE] Failed: Already marked for today`);
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    attendance = new Attendance({
      studentId: studentId,
      date: today,
      status,
      markedBy: 'student'
    });

    await attendance.save();
    console.log(`[ATTENDANCE] Success: Saved attendance`);
    res.json(attendance);
  } catch (err) {
    console.error(`[ATTENDANCE] Error:`, err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/attendance/by-date/:date
// @desc    Get all attendance for a specific date (Teacher)
// @access  Private (Should be restricted to teachers)
router.get('/by-date/:date', auth, async (req, res) => {
  try {
    const { date } = req.params; // YYYY-MM-DD
    const teacherId = req.user.teacher?.id;
    
    if (!teacherId) {
      return res.status(403).json({ message: 'Access denied. Only teachers can view class attendance.' });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    console.log(`[ATTENDANCE] Teacher ${teacher.name} requested attendance. Their classGrade is: "${teacher.classGrade}"`);

    // Fetch students based on teacher's class grade. If not set (legacy account), fetch all.
    let studentsQuery = {};
    if (teacher.classGrade) {
      studentsQuery.classGrade = teacher.classGrade;
    }
    
    const students = await Student.find(studentsQuery).select('firstName lastName classGrade');
    console.log(`[ATTENDANCE] Found ${students.length} students matching query ${JSON.stringify(studentsQuery)}`);
    
    const attendanceRecords = await Attendance.find({ date });

    // Map attendance records to students
    const fullAttendance = students.map(student => {
      const record = attendanceRecords.find(r => r.studentId.toString() === student._id.toString());
      return {
        studentId: student._id,
        name: `${student.firstName} ${student.lastName}`,
        classGrade: student.classGrade,
        status: record ? record.status : 'absent', // Default to absent if no record exists
        markedBy: record ? record.markedBy : 'none',
        recordId: record ? record._id : null
      };
    });

    res.json(fullAttendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/attendance/update
// @desc    Update/Rectify attendance (Teacher)
// @access  Private
router.post('/update', auth, async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    let attendance = await Attendance.findOne({ studentId: studentId, date });

    if (attendance) {
      attendance.status = status;
      attendance.markedBy = 'teacher';
      await attendance.save();
    } else {
      attendance = new Attendance({
        studentId: studentId,
        date,
        status,
        markedBy: 'teacher'
      });
      await attendance.save();
    }

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
