// Render after creating a comment
exports.redirectBack = (req, res) => {
  const comment = res.locals.data.comment;
  if (!comment) return res.redirect('/');
  return res.redirect(`/${comment.onModel.toLowerCase()}s/${comment.on}`);
};
