const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const data = require('./dataController');
const view = require('./viewController');

router.post('/', auth, data.create, view.redirectBack);

module.exports = router;
