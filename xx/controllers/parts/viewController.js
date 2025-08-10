const Part = require("../../models/part")

// Show all items
exports.index = (req, res) => {
  const { parts } = res.locals.data;
  return res.render('parts/Index', { parts, token: res.locals.data?.token });
};

exports.new = (req, res) => {
  return res.render('parts/New', { token: res.locals.data?.token });
};

exports.show = (req, res) => {
  const { part, comments } = res.locals.data;
  return res.render('parts/Show', { part, comments, token: res.locals.data?.token });
};

exports.edit = (req, res) => {
  const { part } = res.locals.data;
  return res.render('parts/Edit', { part, token: res.locals.data?.token });
};

// ✅ مهم: بعد الإنشاء نرجّع لصفحة القطعة
exports.redirectShow = (req, res) => {
  const { part } = res.locals.data;
  return res.redirect(`/parts/${part._id}`);
};

// ✅ بعد التحديث
exports.redirectUpdated = (req, res) => {
  const { part } = res.locals.data;
  return res.redirect(`/parts/${part._id}`);
};

// ✅ بعد الحذف
exports.redirectIndex = (_req, res) => {
  return res.redirect('/parts');
};
