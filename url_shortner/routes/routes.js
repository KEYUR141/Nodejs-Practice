const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const URL = require('../models/url');

const {generateShortUrl, getAllURLRecords} = require('../controller/url_logic');

router.post('/shorten', authMiddleware, generateShortUrl);
router.get('/records', authMiddleware, getAllURLRecords);

module.exports = router;