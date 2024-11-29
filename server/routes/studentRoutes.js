const express = require('express');
const router = express.Router();
const { getStudentProfile, applyJob, editProfile } = require('../controllers/studentController');
const Student = require('../models/Student'); // Mongoose model

router.get('/profile/:id', getStudentProfile);
router.post('/apply-job', applyJob);
router.put('/edit-profile', editProfile);

// login route
router.post('/api/admin/students', async (req, res) => {
    const { registrationNumber, pwd } = req.body;

    try {
        const student = await Student.findOne({ registrationNumber, pwd });
        if (student) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.json({ success: false, message: 'Invalid credentials.' });
        }
    } catch (error) {
        console.error('Error in /api/admin/students route:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});


// // Get details of a specific student by registration number
// router.get('/students/:registrationNumber', async (req, res) => {
//     const { registrationNumber } = req.params;
//     try {
//         const student = await Student.findOne({ registrationNumber });
//         if (student) {
//             res.json({ success: true, student });
//         } else {
//             res.status(404).json({ success: false, message: 'Student not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// });


// Fetch a specific student's details by registration number
router.get('/students/:registrationNumber', async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        const student = await Student.findOne({ registrationNumber });

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching student details' });
    }
});

// In routes/students.js


router.put('/:registrationNumber', async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        const updatedFields = req.body;

        console.log("Updating student:", registrationNumber);
        console.log("Fields to update:", updatedFields);

        const student = await Student.findOneAndUpdate(
            { registrationNumber },
            { $set: updatedFields },
            { new: true }
        );

        if (student) {
            console.log("Update successful:", student);
            res.json({ success: true, student });
        } else {
            console.log("Student not found.");
            res.status(404).json({ success: false, message: 'Student not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Error updating student details' });
    }
});


module.exports = router;
