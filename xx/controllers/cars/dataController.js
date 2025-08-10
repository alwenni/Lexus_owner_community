const Car = require('../../models/car')
const Comment = require('../../models/comment')

// controllers/cars/dataController.js

// GET /cars  — load list (with filters) into res.locals
exports.index = async (req, res, next) => {
  try {
    const { q, make, model, minPrice, maxPrice, minYear, maxYear, location, status } = req.query;

    const filter = {};
    filter.status = status || 'active';
    if (make)     filter.make = new RegExp(`^${make}$`, 'i');
    if (model)    filter.model = new RegExp(`^${model}$`, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (minYear || maxYear) filter.year = {};
    if (minYear) filter.year.$gte = Number(minYear);
    if (maxYear) filter.year.$lte = Number(maxYear);
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const query = Car.find(filter);
    if (q) query.find({ $text: { $search: q } });

    const cars = await query.sort({ createdAt: -1 }).populate('seller', 'username location');
    res.locals.data.cars = cars;
    next();
  } catch (err) {
    next(err);
  }
};

// GET /cars/:id — load one
exports.show = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('seller', 'username location phone');
    if (!car) return res.status(404).send('Car not found');

    const comments = await Comment.find({ onModel: 'Car', on: car._id })
      .populate('author', 'username location')
      .sort({ createdAt: -1 });

    res.locals.data.car = car;
    res.locals.data.comments = comments; // <-- مهم
    next();
  } catch (err) {
    next(err);
  }
};

// POST /cars — create (requires auth)
exports.create = async (req, res, next) => {
  try {
    const payload = {
      seller:      req.user._id,
      make:        (req.body.make || 'Lexus').trim(),
      model:       (req.body.model || '').trim(),
      year:        Number(req.body.year),
      price:       Number(req.body.price),
      mileage:     req.body.mileage ? Number(req.body.mileage) : undefined,
      location:    (req.body.location || '').trim(),
      images:      Array.isArray(req.body.images) ? req.body.images : (req.body.images ? [req.body.images] : []),
      description: (req.body.description || '').trim(),
      features:    Array.isArray(req.body.features) ? req.body.features : (req.body.features ? [req.body.features] : []),
      status:      req.body.status || 'active',
    };

    const car = await Car.create(payload);
    res.locals.data.car = car;
    next();
  } catch (err) {
    next(err);
  }
};

// PUT /cars/:id — update (owner only)
exports.update = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    if (String(car.seller) !== String(req.user._id)) return res.status(403).send('Forbidden');

    const updatable = ['make','model','year','price','mileage','location','images','description','features','status'];
    updatable.forEach((k) => {
      if (typeof req.body[k] !== 'undefined') car[k] = req.body[k];
    });

    await car.save();
    res.locals.data.car = car;
    next();
  } catch (err) {
    next(err);
  }
};

// DELETE /cars/:id — delete (owner only)
exports.destroy = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    if (String(car.seller) !== String(req.user._id)) return res.status(403).send('Forbidden');

    await car.deleteOne();
    res.locals.data.deleted = true;
    next();
  } catch (err) {
    next(err);
  }
};
