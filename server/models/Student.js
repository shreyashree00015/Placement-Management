const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  name: { type: String, required: true },
  cgpa: { type: Number, required: true },
  tenthPercent: { type: Number, required: true },
  twelfthPercent: { type: Number, required: true },
  standingArrears: { type: Number, required: true },
  branch: { type: String, required: true },
  pwd: { type: String, required: true },
  personalEmail: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  address: { type: String, required: false },
  linkedIn: { type: String, required: false },
  dob: { type: Date, required: false },
  gender: { type: String, required: false },
  applications: { type: Object, default: {} },
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
