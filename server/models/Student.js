const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  name: { type: String, required: true },
  cgpa: { type: Number, required: true },
  tenthPercent: { type: Number, required: true },
  twelfthPercent: { type: Number, required: true },
  standingArrears: { type: Number, required: true },
  branch: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
