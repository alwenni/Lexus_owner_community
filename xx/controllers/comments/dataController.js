const Comment = require('../../models/comment');

// Create a comment
exports.create = async (req, res, next) => {
  try {
    const { onModel, on, body } = req.body;

    if (!['Car', 'Part'].includes(onModel)) {
      return res.status(400).send('Invalid target model');
    }

    const comment = await Comment.create({
      author: req.user._id,
      onModel,
      on,
      body: body.trim(),
    });

    res.locals.data.comment = comment;
    next();
  } catch (err) {
    next(err);
  }
};

// List comments for a specific Car or Part
exports.listForTarget = async (req, res, next) => {
  try {
    const { onModel, on } = req.params;

    if (!['Car', 'Part'].includes(onModel)) {
      return res.status(400).send('Invalid target model');
    }

    const comments = await Comment.find({ onModel, on })
      .populate('author', 'username location')
      .sort({ createdAt: -1 });

    res.locals.data.comments = comments;
    next();
  } catch (err) {
    next(err);
  }
};
