const express = require('express');
const router = express.Router();
const konyvekcontrollers = require('../controllers/konyvekcontrollers');



router.get('/search', konyvekcontrollers.filter);
router.get('/kategoria', konyvekcontrollers.kategoria);
router.get('/ISBN',konyvekcontrollers.getbyISBN);

router.delete('/:ISBN', konyvekcontrollers.delete);
router.get('/', konyvekcontrollers.getAllKonyvek);
module.exports = router;