const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  const RegisteredLogins = mongoose.model('RegisteredLogins', new mongoose.Schema({ registrationNumber: String, password: String }), 'registeredlogins');

  RegisteredLogins.find()
    .then((data) => {
      console.log('Registered Logins:', data);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error fetching registered logins:', err);
      mongoose.connection.close();
    });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
