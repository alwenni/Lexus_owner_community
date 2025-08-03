const Author = require('../../models/author')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, 'secret')
    const author = await Author.findOne({ _id: data._id })
    if (!author) {
      throw new Error()
    }
    req.author = author
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

exports.createAuthor = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }
    
    const author = new Author(req.body)
    await author.save()
    const token = await author.generateAuthToken()
    res.status(201).json({ author, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.loginAuthor = async (req, res) => {
  try {
    const author = await Author.findOne({ email: req.body.email })
    if (!author || !await bcrypt.compare(req.body.password, author.password)) {
      return res.status(400).json({ message: 'Invalid login credentials' })
    }
    const token = await author.generateAuthToken()
    res.json({ author, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getProfile = async (req, res) => {
  try {
    await req.author.populate('posts')
    res.json({ author: req.author })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}