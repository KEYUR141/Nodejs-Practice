const UserController = require('../controller/user');
const express = require('express');
const router = express.Router();


router.post('/signup', UserController.createUser);

router.post('/login', UserController.authenticateUser);
module.exports = router;