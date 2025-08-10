const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // عدّل المسار إذا لزم
const data = require('./dataController');
const view = require('./viewController');

router.get('/',        data.index, view.index);
router.get('/new',     auth,       view.new);
router.get('/:id',     data.show,  view.show);
router.get('/:id/edit',auth,       data.show,  view.edit);
router.post('/',       auth,       data.create,  view.redirectShow);
router.put('/:id',     auth,       data.update,  view.redirectUpdated);
router.delete('/:id',  auth,       data.destroy, view.redirectIndex);

module.exports = router;
