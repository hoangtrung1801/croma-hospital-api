const express = require('express');
const { ROLE } = require('../../config');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const checkRole = require('../middlewares/checkRole');

// login user
router.post('/login', authController.loginUser);

// create user ( only admin )
router.post('/create', checkRole(ROLE.admin), authController.createUser);

// reset password
router.patch('/reset-password', checkRole(ROLE.admin, ROLE.doctor, ROLE.dean, ROLE.nurse, ROLE.dispatcher), authController.resetPasswordUser);

module.exports = router;