const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// get current user (with token) or get all users
router.get('/', userController.getCurrentUser, userController.getUsers)

// get user with userId
router.get('/:userId', userController.getUser);

module.exports = router;