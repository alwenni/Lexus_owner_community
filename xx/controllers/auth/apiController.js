// controllers/auth/apiController.js
const User = require('../../models/user');         // انتبه لحالة الأحرف
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// helper: يبني التوكن بنفس السر من .env
function signToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

/* ============ POST /api/users/signup ============ */
exports.signup = async (req, res) => {
  try {
    let { name, username, email, password, location, phone } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: 'Name, username, email, and password are required' });
    }

    // normalize
    username = (username || '').toLowerCase().trim();
    email = (email || '').toLowerCase().trim();

    // checks
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ error: 'Email already exists' });

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ error: 'Username already exists' });

    // create (password يتشفّر في pre-save hook)
    const user = await User.create({
      name: name.trim(),
      username,
      email,
      password,
      location: location?.trim(),
      phone: phone?.trim(),
    });

    const token = signToken(user._id);
    return res.status(201).json({ user: user.toJSON(), token });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Signup failed' });
  }
};

/* ============ POST /api/users/login ============ */
exports.login = async (req, res) => {
  try {
    const email = (req.body.email || '').toLowerCase().trim();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid login credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid login credentials' });

    const token = signToken(user._id);
    return res.json({ user: user.toJSON(), token });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Login failed' });
  }
};

/* ============ GET /api/users/profile  (محمي) ============ */
/* يعتمد على middleware/auth لتعبئة req.user */
exports.profile = async (req, res) => {
  try {
    // لو تبي تجيب سيارات/قطع المستخدم: .populate('cars') ... الخ
    const user = await User.findById(req.user._id);
    return res.json({ user: user.toJSON() });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Failed to load profile' });
  }
};

/* ============ PUT /api/users/:id  (محمي) ============ */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // يسمح للمستخدم يحدّث نفسه فقط (عدّلها لو عندك دور أدمن)
    if (String(req.user._id) !== String(id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const allowed = ['name', 'username', 'email', 'password', 'location', 'phone'];
    const body = {};
    for (const k of allowed) {
      if (typeof req.body[k] !== 'undefined') body[k] = req.body[k];
    }

    // normalize
    if (body.username) body.username = body.username.toLowerCase().trim();
    if (body.email) body.email = body.email.toLowerCase().trim();

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    Object.assign(user, body);
    await user.save(); // سيشفر كلمة السر إذا تغيرت

    return res.json({ user: user.toJSON() });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Update failed' });
  }
};

/* ============ DELETE /api/users/:id  (محمي) ============ */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (String(req.user._id) !== String(id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.deleteOne();
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Delete failed' });
  }
};
