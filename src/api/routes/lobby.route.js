const express = require('express');
const router = express.Router();

const lobbyController = require('../controllers/lobby.controller');

router.get('/', lobbyController.getPatients);
router.get('/coordinate', lobbyController.coordinate);

module.exports = router;