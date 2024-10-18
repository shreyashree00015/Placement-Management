const express = require('express');
const router = express.Router();
const Company = require('../models/companyModel');
const Student = require('../models/Student');

// Get list of companies
router.get('/companies', async (req, res) => {
  console.log('Received request for companies');
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get list of students
router.get('/students', async (req, res) => {
  console.log('Received request for Student Profiles');
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new company (Admin only)
router.post('/add-company', async (req, res) => {
  console.log('Received request for adding a new company');
  const { name, ctc, eligibility, rounds, role, location } = req.body;
  try {
    const newCompany = new Company({ name, ctc, role, location, rounds });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Edit an existing company (Admin only)
router.put('/edit-company/:id', async (req, res) => {
  const { name, ctc, eligibility, rounds, role, location } = req.body;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { name, ctc, eligibility, rounds, role, location },
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a company (Admin only)
router.delete('/delete-company/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    await company.remove();
    res.json({ message: 'Company removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});
// Add a new student (Admin only)
router.post('/add-student', async (req, res) => {
  console.log('Received request for adding a new student');
  const { name, registrationNumber, cgpa, tenthPercent, twelfthPercent, standingArrears, branch } = req.body; // Match your schema here
  try {
      const newStudent = new Student({ name, registrationNumber, cgpa, tenthPercent, twelfthPercent, standingArrears, branch });
      await newStudent.save();
      res.status(201).json(newStudent);
  } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server Error' });
  }
});

// Edit an existing student (Admin only)
router.put('/edit-student/:id', async (req, res) => {
  const { name, registrationNumber, cgpa, tenthPercent, twelfthPercent, standingArrears, branch } = req.body; // Match your schema here
  try {
      const updatedStudent = await Student.findByIdAndUpdate(
          req.params.id,
          { name, registrationNumber, cgpa, tenthPercent, twelfthPercent, standingArrears, branch },
          { new: true }
      );
      if (!updatedStudent) {
          return res.status(404).json({ message: 'Student not found' });
      }
      res.json(updatedStudent);
  } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server Error' });
  }
});



// Delete a student (Admin only)
router.delete('/delete-student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.remove();
    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single company by ID
router.get('/company/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
