const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');

router.get('/', roomController.getRooms);

module.exports = router;