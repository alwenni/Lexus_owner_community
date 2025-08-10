// controllers/auth/dataController.js
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function ensureLocals(req, res) {
  if (!res.locals.data) res.locals.data = {};
}

/* ميدلوير التوثيق للمسارات المحمية (لو تحتاجه هنا) */
exports.auth = async (req, res, next) => {
  try {
    let token = null;
    if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    } else if (req.query.token) {
      token = req.query.token;
    }
    if (!token) return res.status(401).send('Not authorized');

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload._id);
    if (!user) return res.status(401).send('Not authorized');

    req.user = user;
    ensureLocals(req, res);
    res.locals.data.token = token;
    next();
  } catch (err) {
    return res.status(401).send('Not authorized');
  }
};

/* ====== SSR: POST /users/signup ====== */
exports.signup = async (req, res, next) => {
  try {
    ensureLocals(req, res);
    let { name, username, email, password, location, phone } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).send('Missing required fields');
    }

    username = (username || '').toLowerCase().trim();
    email = (email || '').toLowerCase().trim();

    const existsEmail = await User.findOne({ email });
    if (existsEmail) return res.status(400).send('Email already exists');

    const existsUser  = await User.findOne({ username });
    if (existsUser) return res.status(400).send('Username already exists');

    const user = await User.create({
      name: name.trim(),
      username,
      email,
      password,          // pre-save hook يشفّرها
      location: location?.trim(),
      phone: phone?.trim(),
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.locals.data.user = user;
    res.locals.data.token = token;

    // توجيه بعد النجاح
    return res.redirect(`/cars?token=${encodeURIComponent(token)}`);
  } catch (err) {
    return res.status(400).send(err.message || 'Signup failed');
  }
};

/* ====== SSR: POST /users/login ====== */
exports.login = async (req, res, next) => {
  try {
    ensureLocals(req, res);

    const email = (req.body.email || '').toLowerCase().trim();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      // console.log('[LOGIN] user not found:', email);
      return res.status(400).send('Invalid login credentials');
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      // console.log('[LOGIN] password mismatch for:', email);
      return res.status(400).send('Invalid login credentials');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.locals.data.user = user;
    res.locals.data.token = token;

    // توجيه بعد النجاح
    return res.redirect(`/cars?token=${encodeURIComponent(token)}`);
  } catch (err) {
    return res.status(400).send(err.message || 'Login failed');
  }
};


exports.profile = async (req, res, next) => {
  try {
    // الميدلوير auth يضيف user للـ req
    if (!req.user) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // ممكن تضيف populate لعلاقات أخرى لو موجودة
    // await req.user.populate('cars');
    // await req.user.populate('parts');

    // نخزن البيانات في res.locals لعرضها في الـ view
    if (!res.locals.data) res.locals.data = {};
    res.locals.data.user = req.user;
    res.locals.data.token = res.locals.data.token || null;

    next(); // نكمل للميدلوير اللي بعده (الـ view)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
