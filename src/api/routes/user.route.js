const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers)

// get user with userId
router.get('/:userId', userController.getUser);

module.exports = router;