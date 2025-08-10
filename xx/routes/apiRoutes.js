// routes/apiRoutes.js
const express = require('express');
const router = express.Router();

/* ---------- Auth (API) ---------- */
const authApi = require('../controllers/auth/apiController');

/* ---------- Auth Middleware (JWT) ---------- */
const auth = require('../middleware/auth'); // تأكد الملف موجود

/* ---------- Data Controllers (Cars / Parts / Comments) ---------- */
const carsData = require('../controllers/cars/dataController');
const partsData = require('../controllers/parts/dataController');
const commentsData = require('../controllers/comments/dataController');

/* ===================== Users API ===================== */
// تسجيل
router.post('/users/signup', authApi.signup);
// تسجيل دخول
router.post('/users/login', authApi.login);
// بروفايل (JWT)
router.get('/users/profile', auth, authApi.profile);

/* ===================== Cars API ===================== */
router.get('/cars', carsData.index, (req, res) => {
  res.json({ cars: res.locals.data.cars || [] });
});

router.get('/cars/:id', carsData.show, (req, res) => {
  res.json({
    car: res.locals.data.car,
    comments: res.locals.data.comments || []
  });
});

router.post('/cars', auth, carsData.create, (req, res) => {
  res.status(201).json({ car: res.locals.data.car });
});

router.put('/cars/:id', auth, carsData.update, (req, res) => {
  res.json({ car: res.locals.data.car });
});

router.delete('/cars/:id', auth, carsData.destroy, (req, res) => {
  res.json({ ok: true });
});

/* ===================== Parts API ===================== */
router.get('/parts', partsData.index, (req, res) => {
  res.json({ parts: res.locals.data.parts || [] });
});

router.get('/parts/:id', partsData.show, (req, res) => {
  res.json({
    part: res.locals.data.part,
    comments: res.locals.data.comments || []
  });
});

router.post('/parts', auth, partsData.create, (req, res) => {
  res.status(201).json({ part: res.locals.data.part });
});

router.put('/parts/:id', auth, partsData.update, (req, res) => {
  res.json({ part: res.locals.data.part });
});

router.delete('/parts/:id', auth, partsData.destroy, (req, res) => {
  res.json({ ok: true });
});

/* ===================== Comments API ===================== */
router.post('/comments', auth, commentsData.create, (req, res) => {
  res.status(201).json({ comment: res.locals.data.comment });
});

router.get('/comments/:onModel/:on', commentsData.listForTarget, (req, res) => {
  res.json({ comments: res.locals.data.comments || [] });
});

module.exports = router;
