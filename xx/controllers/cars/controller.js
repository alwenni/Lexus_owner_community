const Car = require('../../models/car')
// controllers/cars/controller.js

// GET /cars  — list + filters
// أمثلة فلترة:
// /cars?make=Lexus&model=GS%20300&minYear=1998&maxPrice=6000&location=Manama&q=gear
exports.index = async (req, res) => {
  try {
    const { q, make, model, minPrice, maxPrice, minYear, maxYear, location, status } = req.query;

    const filter = {};
    if (status) filter.status = status; else filter.status = 'active';
    if (make)   filter.make   = new RegExp(`^${make}$`, 'i');
    if (model)  filter.model  = new RegExp(`^${model}$`, 'i');
    if (location) filter.location = new RegExp(location, 'i');

    if (minYear || maxYear) filter.year = {};
    if (minYear) filter.year.$gte = Number(minYear);
    if (maxYear) filter.year.$lte = Number(maxYear);

    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    // بحث نصي عام (يتطلب carSchema.index نصي — موجود في الموديل)
    const query = Car.find(filter);
    if (q) query.find({ $text: { $search: q } });

    const cars = await query.sort({ createdAt: -1 }).populate('seller', 'username location');

    // إذا عندك واجهات SSR React:
    if (res.render) return res.render('cars/Index', { cars });
    // وإلا API:
    return res.json({ cars });
  } catch (err) {
    console.error('Cars.index error:', err);
    return res.status(500).send('Failed to load cars');
  }
};

// GET /cars/new — show create form
exports.newForm = (req, res) => {
  try {
    if (res.render) return res.render('cars/New');
    return res.json({ ok: true, form: 'car-new' });
  } catch (err) {
    return res.status(500).send('Failed to open new form');
  }
};

// POST /cars — create
exports.create = async (req, res) => {
  try {
    const payload = {
      seller:     req.user._id,
      make:       (req.body.make || 'Lexus').trim(),
      model:      (req.body.model || '').trim(),
      year:       Number(req.body.year),
      price:      Number(req.body.price),
      mileage:    req.body.mileage ? Number(req.body.mileage) : undefined,
      location:   (req.body.location || '').trim(),
      images:     Array.isArray(req.body.images) ? req.body.images : (req.body.images ? [req.body.images] : []),
      description:(req.body.description || '').trim(),
      features:   Array.isArray(req.body.features) ? req.body.features : (req.body.features ? [req.body.features] : []),
      status:     req.body.status || 'active',
    };

    const car = await Car.create(payload);

    // SSR
    if (res.render) return res.redirect(`/cars/${car._id}`);
    // API
    return res.status(201).json({ car });
  } catch (err) {
    console.error('Cars.create error:', err);
    return res.status(400).send(err.message || 'Failed to create car');
  }
};

// GET /cars/:id — show details
exports.show = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'username location phone');
    if (!car) return res.status(404).send('Car not found');

    if (res.render) return res.render('cars/Show', { car });
    return res.json({ car });
  } catch (err) {
    console.error('Cars.show error:', err);
    return res.status(500).send('Failed to load car');
  }
};

// GET /cars/:id/edit — edit form (owner only)
exports.editForm = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    if (String(car.seller) !== String(req.user._id)) return res.status(403).send('Forbidden');

    if (res.render) return res.render('cars/Edit', { car });
    return res.json({ car, form: 'car-edit' });
  } catch (err) {
    console.error('Cars.editForm error:', err);
    return res.status(500).send('Failed to open edit form');
  }
};

// PUT /cars/:id — update (owner only)
exports.update = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    if (String(car.seller) !== String(req.user._id)) return res.status(403).send('Forbidden');

    const updatable = ['make','model','year','price','mileage','location','images','description','features','status'];
    updatable.forEach((k) => {
      if (typeof req.body[k] !== 'undefined') car[k] = req.body[k];
    });

    await car.save();

    if (res.render) return res.redirect(`/cars/${car._id}`);
    return res.json({ car });
  } catch (err) {
    console.error('Cars.update error:', err);
    return res.status(400).send(err.message || 'Failed to update car');
  }
};

// DELETE /cars/:id — delete (owner only)
exports.destroy = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    if (String(car.seller) !== String(req.user._id)) return res.status(403).send('Forbidden');

    await car.deleteOne();

    if (res.render) return res.redirect('/cars');
    return res.json({ ok: true });
  } catch (err) {
    console.error('Cars.destroy error:', err);
    return res.status(500).send('Failed to delete car');
  }
};

