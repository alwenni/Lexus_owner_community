// controllers/auth/routeController.js
const express = require('express');
const router = express.Router();

const data = require('./dataController');
const view = require('./viewController');
const auth = require('../../middleware/auth'); 

// فورمات
router.get('/signup', view.signUp);
router.post('/signup', data.signup);         // ← هنا
router.get('/login',  view.signIn);
router.post('/login',  data.login);          // ← وهنا

router.get('/profile', data.auth, data.profile, view.showProfile);
router.get('/logout', view.logout);

module.exports = router;