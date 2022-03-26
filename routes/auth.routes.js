const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');

router.post('/api/auth/register', Auth.Register);
router.post('/api/auth/login', Auth.Login);

module.exports = router;
