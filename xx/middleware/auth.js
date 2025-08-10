

// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // انتبه لحالة الأحرف و المسار

module.exports = async function auth(req, res, next) {
  // السماح بطلبات CORS preflight بدون توثيق
  if (req.method === 'OPTIONS') return next();

  try {
    let token = null;

    // 1) Authorization: Bearer <token>
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    }

    // 2) Query ?token= (للـ SSR وروابط التنقل)
    if (!token && req.query && req.query.token) {
      token = String(req.query.token).trim();
    }

    // 3) Cookie token= (إذا استخدمت cookie-parser)
    if (!token && req.cookies && req.cookies.token) {
      token = String(req.cookies.token).trim();
    }

    // لا يوجد توكن
    if (!token) return handleUnauthorized(req, res);

    // تأكد من إعداد السر
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment variables.');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    // تحقق وفك التوكن
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // اجلب المستخدم
    const user = await User.findById(payload._id);
    if (!user) return handleUnauthorized(req, res);

    // مرّر للمسار التالي
    req.user = user;
    res.locals.data = res.locals.data || {};
    res.locals.data.token = token;

    return next();
  } catch (err) {
    // بإمكانك تسجيل الخطأ في التطوير لتسهيل التشخيص
    if (process.env.NODE_ENV !== 'production') {
      console.error('Auth middleware error:', err.message);
    }
    return handleUnauthorized(req, res);
  }
};

function handleUnauthorized(req, res) {
  // مسارات API ترجع JSON 401
  if (req.originalUrl?.startsWith('/api') || req.path?.startsWith('/api')) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  // صفحات SSR: أعِد التوجيه لصفحة الدخول
  return res.redirect('/users/login');
}
