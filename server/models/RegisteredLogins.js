const mongoose = require('mongoose');

const registeredLoginSchema = new mongoose.Schema({
    registrationNumber: { type: String, required: true, unique: true }, // Use this field
    password: { type: String, required: true },
});

module.exports = mongoose.model('RegisteredLogins', registeredLoginSchema);

