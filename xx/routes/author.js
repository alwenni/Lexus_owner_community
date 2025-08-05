const express = require('express');
const router = express.Router();

// Web Controllers (for rendering views)
const routeController = require('../controllers/auth/routeController');

// صفحات تسجيل الدخول والتسجيل
router.get('/login', routeController.showLoginPage);
router.post('/login', routeController.login);
router.get('/register', routeController.showRegisterPage);
router.post('/register', routeController.register);
router.post('/users/login', authorApiController.loginAuthor);
router.post('/users/register', authorApiController.registerAuthor);
router.get('/users/signin', routeController.showSignInPage);
router.post('/users/signin', authorApiController.loginAuthor);

module.exports = router;
