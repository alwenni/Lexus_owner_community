// controllers/parts/routeController.js



const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');       // middleware auth (function)
const data = require('./dataController');            // index/show/create/update/destroy
const view = require('./viewController');            // index/new/show/edit/redirectShow/redirectUpdated/redirectIndex

// ترتيب مهم: /new قبل /:id
router.get('/',         data.index,  view.index);
router.get('/new',      auth,        view.new);

router.get('/:id',      data.show,   view.show);
router.get('/:id/edit', auth,        data.show,  view.edit);

router.post('/',        auth,        data.create,   view.redirectShow);
router.put('/:id',      auth,        data.update,   view.redirectUpdated);
router.delete('/:id',   auth,        data.destroy,  view.redirectIndex);

module.exports = router;
