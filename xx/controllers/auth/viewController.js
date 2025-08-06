const User = require('../../models/user')

// Show signup form
exports.signUp = (req, res) => {
  res.render('auth/SignUp')
}

// Show login form
exports.signIn = (req, res) => {
  res.render('auth/SignIn')
}

// Show user profile
exports.showProfile = async (req, res) => {
  try {
    await req.user.populate('cars')
    res.render('items/IndexCar', { user: req.user, token: res.locals.data.token })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

