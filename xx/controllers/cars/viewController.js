const { token } = require("morgan")
const Car = require("../../models/car")

// controllers/cars/viewController.js

// قائمة السيارات
exports.index = (req, res) => {
  const { cars } = res.locals.data;
  return res.render('cars/Index', { cars, token: res.locals.data?.token });
};

exports.new = (req, res) => {
  return res.render('cars/New', { token: res.locals.data?.token });
};

exports.show = (req, res) => {
  const { car, comments } = res.locals.data;
  return res.render('cars/Show', { car, comments, token: res.locals.data?.token });
};

exports.edit = (req, res) => {
  const { car } = res.locals.data;
  return res.render('cars/Edit', { car, token: res.locals.data?.token });
};


// بعد الإنشاء
exports.redirectShow = (req, res) => {
  const { car } = res.locals.data;
  return res.redirect(`/cars/${car._id}`);
};

// بعد التعديل
exports.redirectUpdated = (req, res) => {
  const { car } = res.locals.data;
  return res.redirect(`/cars/${car._id}`);
};

// بعد الحذف
exports.redirectIndex = (req, res) => {
  return res.redirect('/cars');
};
