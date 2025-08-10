const Part = require('../../models/part');
const Comment = require('../../models/comment');

// Helper: يحوّل "a, b , c" => ["a","b","c"]
const split = (s) => (typeof s === 'string'
  ? s.split(',').map(x => x.trim()).filter(Boolean)
  : Array.isArray(s) ? s : []);

// GET /parts — list + filters
exports.index = async (req, res, next) => {
  try {
    const { q, title, condition, minPrice, maxPrice, location, status } = req.query;
    const filter = {};

    filter.status = status || 'active';
    if (title) filter.title = new RegExp(title, 'i');
    if (condition) filter.condition = condition;
    if (location) filter.location = new RegExp(location, 'i');

    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const query = Part.find(filter);
    if (q) query.find({ $text: { $search: q } });

    const parts = await query.sort({ createdAt: -1 }).populate('seller', 'username location');
    res.locals.data.parts = parts;
    next();
  } catch (err) {
    next(err);
  }
};

// GET /parts/:id — show one + comments
exports.show = async (req, res, next) => {
  try {
    const part = await Part.findById(req.params.id).populate('seller', 'username location phone');
    if (!part) return res.status(404).send('Part not found');

    const comments = await Comment.find({ onModel: 'Part', on: part._id })
      .populate('author', 'username location')
      .sort({ createdAt: -1 });

    res.locals.data.part = part;
    res.locals.data.comments = comments;
    next();
  } catch (err) {
    next(err);
  }
};

// POST /parts — create
exports.create = async (req, res, next) => {
  try {
    const payload = {
      seller:           req.user._id,
      title:            req.body.title?.trim(),
      description:      req.body.description?.trim(),
      condition:        req.body.condition || 'used',
      price:            Number(req.body.price),
      location:         req.body.location?.trim(),
      images:           Array.isArray(req.body.images) ? req.body.images : split(req.body.images),
      compatibleModels: Array.isArray(req.body.compatibleModels) ? req.body.compatibleModels : split(req.body.compatibleModels),
      status:           req.body.status || 'active',
    };

    const part = await Part.create(payload);
    res.locals.data.part = part;
    next();
  } catch (err) {
    next(err);
  }
};

// PUT /parts/:id — update (owner only)
exports.update = async (req, res, next) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).send('Part not found');
    if (String(part.seller) !== String(req.user._id)) return res.status(403).send('Forbidden');

    // تحويل الحقول النصية لمصفوفات إذا أرسلت كنص مفصول بفواصل
    const body = { ...req.body };
    if (typeof body.images !== 'undefined' && !Array.isArray(body.images)) {
      body.images = split(body.images);
    }
    if (typeof body.compatibleModels !== 'undefined' && !Array.isArray(body.compatibleModels)) {
      body.compatibleModels = split(body.compatibleModels);
    }

    const updatable = ['title','description','condition','price','location','images','compatibleModels','status'];
    updatable.forEach((k) => {
      if (typeof body[k] !== 'undefined') part[k] = body[k];
    });

    await part.save();
    res.locals.data.part = part;
    next();
  } catch (err) {
    next(err);
  }
};

// DELETE /parts/:id — delete (owner only)
exports.destroy = async (req, res, next) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).send('Part not found');
    if (String(part.seller) !== String(req.user._id)) return res.status(403).send('Forbidden');

    await part.deleteOne();
    res.locals.data.deleted = true;
    next();
  } catch (err) {
    next(err);
  }
};
