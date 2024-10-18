const express = require('express');
const router = express.Router();
const { getStudentProfile, applyJob, editProfile } = require('../controllers/studentController');

router.get('/profile/:id', getStudentProfile);
router.post('/apply-job', applyJob);
router.put('/edit-profile', editProfile);

module.exports = router;
