const express = require('express');
const router = express.Router();

// Web Controllers (for rendering views)
const routeController = require('../controllers/auth/routeController');

// صفحات تسجيل الدخول والتسجيل
router.get('/login', routeController.showLoginPage);
router.post('/login', routeController.login);
router.get('/register', routeController.showRegisterPage);
router.post('/register', routeController.register);

module.exports = router;
