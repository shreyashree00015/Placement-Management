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

// Define the Company model
const companySchema = new mongoose.Schema({
  name: String,
  ctc: Number,
});

const Company = mongoose.model('Company', companySchema);

// Seed data
const seedCompanies = [
  { name: 'Amazon', ctc: 110000 },
  { name: 'SAP', ctc: 30000 },
  { name: 'Maersk', ctc: 50000 },
];

// Function to seed companies
const seedDatabase = async () => {
  // await Company.deleteMany({}); // Clear existing data
  await Company.insertMany(seedCompanies);
  console.log('Database seeded!');
  mongoose.connection.close();
};

// Run the seed function
seedDatabase().catch(err => console.error(err));
