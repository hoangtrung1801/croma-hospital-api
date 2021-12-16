const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctor.controller');

router.post('/primitive-diagnosis', doctorController.primitiveDiagnosis);

module.exports = router;