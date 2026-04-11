const express = require('express');
const router = express.Router();

const URL = require('../models/url');

const {generateShortUrl, getAllURLRecords} = require('../controller/url_logic');

router.post('/shorten', generateShortUrl);
router.get('/records', getAllURLRecords);

module.exports = router;