const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the Student model
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

// Seed data
const seedStudents = [
  {
    registrationNumber: '2020001',
    name: 'John Doe',
    cgpa: 8.5,
    tenthPercent: 85,
    twelfthPercent: 87,
    standingArrears: 0,
    branch: 'CSE'
  },
  {
    registrationNumber: '2020002',
    name: 'Jane Smith',
    cgpa: 9.0,
    tenthPercent: 90,
    twelfthPercent: 88,
    standingArrears: 1,
    branch: 'ECE'
  },
  {
    registrationNumber: '2020003',
    name: 'David Williams',
    cgpa: 7.5,
    tenthPercent: 75,
    twelfthPercent: 78,
    standingArrears: 2,
    branch: 'MEE'
  },
  {
    registrationNumber: 'AIE21118',
    name: 'Shreya Shree S',
    cgpa: 9.53,
    tenthPercent: 94,
    twelfthPercent: 94,
    standingArrears: 0,
    branch: 'AIE'
  },
  {
    registrationNumber: 'AIE21107',
    name: 'Priyanka Katariya',
    cgpa: 8.12,
    tenthPercent: 95,
    twelfthPercent: 90,
    standingArrears: 0,
    branch: 'AIE'
  },
  {
    registrationNumber: 'AIE21144',
    name: 'Vishwash Sharma',
    cgpa: 8.8,
    tenthPercent: 92,
    twelfthPercent: 88,
    standingArrears: 0,
    branch: 'AIE'
  }
];

// Function to seed students
const seedDatabase = async () => {
  // Uncomment the following line if you want to clear the existing student data before seeding
  // await Student.deleteMany({}); // Clear existing data
  await Student.insertMany(seedStudents);
  console.log('Student database seeded!');
  mongoose.connection.close();
};

// Run the seed function
seedDatabase().catch(err => console.error(err));
