// controllers/auth/viewController.js

/* صفحات الفورم */
exports.signUp = (req, res) => {
  res.render('auth/SignUp', { token: res.locals.data?.token });
};

exports.signIn = (req, res) => {
  res.render('auth/SignIn', { token: res.locals.data?.token });
};

/* بعد النجاح */
exports.redirectAfterSignup = (req, res) => {
  const token = res.locals.data?.token;
  return res.redirect(token ? `/cars?token=${encodeURIComponent(token)}` : '/cars');
};

exports.redirectAfterLogin = (req, res) => {
  const token = res.locals.data?.token;
  return res.redirect(token ? `/cars?token=${encodeURIComponent(token)}` : '/cars');
};

/* عرض البروفايل */
exports.showProfile = (req, res) => {
  const { user } = res.locals.data;
  res.render('users/Profile', { user, token: res.locals.data?.token });
};

/* تسجيل الخروج (JWT لا يُلغى من السيرفر؛ فقط نشيل التوكن من الرابط/الكلانت) */
exports.logout = (req, res) => {
  // توجيه بسيط بدون token
  res.redirect('/cars');
};
