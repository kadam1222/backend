const express = require('express');
const router = express.Router();
const konyvekcontrollers = require('../controllers/konyvekcontrollers');

// GET /orszagok – az összes ország lekérdezése
router.get('/', konyvekcontrollers.getAllKonyvek);
router.get('/search', konyvekcontrollers.filter);

module.exports = router;