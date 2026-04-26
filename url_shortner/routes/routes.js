const express = require('express');
const router = express.Router();
const { authMiddleware, restrictTo } = require('../middleware/auth');
const URL = require('../models/url');

const {generateShortUrl, getAllURLRecords} = require('../controller/url_logic');

router.post('/shorten', authMiddleware, restrictTo(['Normal_User']), generateShortUrl);
router.get('/records', authMiddleware, restrictTo(['Normal_User']), getAllURLRecords);

module.exports = router;