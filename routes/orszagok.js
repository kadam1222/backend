const express = require('express');
const router = express.Router();
const orszagController = require('../controllers/orszagcontrollers');

// GET /orszagok – az összes ország lekérdezése
router.get('/', orszagController.getAllOrszagok);

module.exports = router;