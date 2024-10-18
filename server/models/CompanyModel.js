const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    ctc: { type: Number, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    rounds: { type: Number, required: true },
});

// Export the Company model, ensuring no duplication occurs
const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

module.exports = Company;
