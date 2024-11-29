const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Student = require('./models/Student'); // Adjust the path as necessary



// Load environment variables
dotenv.config();
// console.log('Admin Key:', process.env.ADMIN_KEY); // Add this line


// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Admin authentication middleware
const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey === process.env.ADMIN_KEY) {
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};

// Routes
// app.use('/api/student', studentRoutes);
app.use(studentRoutes);
app.use('/api/admin', adminRoutes);
// Endpoint to fetch student details
app.get('/api/students/:registrationNumber', async (req, res) => {
  const { registrationNumber } = req.params;
  try {
      const student = await Student.findOne({ registrationNumber });
      if (student) {
          return res.json({ success: true, student });
      } else {
          return res.status(404).json({ success: false, message: 'Student not found' });
      }
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/students/:registrationNumber', async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const updatedData = req.body; // Ensure this is correctly parsed

  try {
      // Your logic to find and update the student in the database
      const updatedStudent = await Student.findOneAndUpdate(
          { registrationNumber },
          updatedData,
          { new: true } // Return the updated document
      );

      if (!updatedStudent) {
          return res.status(404).json({ success: false, message: 'Student not found' });
      }

      res.json({ success: true, student: updatedStudent });
  } catch (err) {
      res.status(500).json({ success: false, message: err.message });
  }
});
// Example backend code
// Example backend code in your server file
app.patch('/api/student/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { companyName, status } = req.body;

  try {
      // Use $set to update the applications object dynamically
      await Student.updateOne(
          { registrationNumber: id },
          { $set: { [`applications.${companyName}`]: status } } // Dynamically set the field
      );
      res.status(200).send({ message: 'Application updated successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error updating application' });
  }
});

app.get('/api/admin/applications/:companyName', async (req, res) => {
  try {
      const { companyName } = req.params;
      // Create a query object dynamically
      const query = {
          [`applications.${companyName}`]: "applied" // Use dynamic key with dot notation
      };
      
      const students = await Student.find(query);
      res.json(students);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching students' });
  }
});




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
