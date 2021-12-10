const express = require('express');
const router = express.Router();
const multer = require('multer');

const patientController = require('../controllers/patient.controller');

const upload = multer({dest: './src/public/images'});

router.post('/register', upload.single('image'), patientController.examinateMedical);

module.exports = router;