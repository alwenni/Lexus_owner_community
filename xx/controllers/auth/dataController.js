const Author = require('../../models/author')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  try {
    let token
    if(req.query.token){
      token = req.query.token
    }else if(req.header('Authorization')){
      token = req.header('Authorization').replace('Bearer ', '')
    }else {
      throw new Error('No token provided')
    }
    const data = jwt.verify(token, 'secret')
    const author = await Author.findOne({ _id: data._id })
    if (!author) {
      throw new Error()
    }
    req.author = author
    res.locals.data.token = token
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

exports.createAuthor = async (req, res, next) => {
  try{
    const author = new Author(req.body)
    await author.save()
    const token = await author.generateAuthToken()
    res.locals.data.token = token 
    req.author = author
    next()
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.loginAuthor = async (req, res, next) => {
  try{
    const author = await Author.findOne({ email: req.body.email })
    if (!author || !await bcrypt.compare(req.body.password, author.password)) {
      res.status(400).send('Invalid login credentials')
    } else {
      const token = await author.generateAuthToken()
      res.locals.data.token = token 
      req.author = author
      next()
    }
  } catch(error){
    res.status(400).json({message: error.message})
  }
}