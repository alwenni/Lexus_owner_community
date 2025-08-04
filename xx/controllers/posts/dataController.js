const Post = require('../../models/Car.js')

const dataController = {}

dataController.index = async (req, res, next) => {
  try {
    const author = await req.author.populate('posts')
    res.locals.data.posts = author.posts
    next()
  } catch(error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.create = async (req, res, next) => {
  if(req.body.published === 'on'){
    req.body.published = true;
  } else if(req.body.published !== true) {
    req.body.published = false;
  }
  try {
    req.body.author = req.author._id
    res.locals.data.post = await Post.create(req.body)
    req.author.posts.addToSet({_id: res.locals.data.post._id })
    await req.author.save()
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.show = async (req, res, next) => {
  try {
    res.locals.data.post = await Post.findById(req.params.id)
    if(!res.locals.data.post){
      throw new Error(`Could not locate a post with the id ${req.params.id}`)
    }
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.update = async (req, res, next) => {
  if(req.body.published === 'on'){
    req.body.published = true;
  } else if(req.body.published !== true) {
    req.body.published = false;
  }
  try {
    res.locals.data.post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.destroy = async (req, res, next) => {
  try {
    await Post.findOneAndDelete({'_id': req.params.id }).then(() => {
      next()
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

module.exports = dataController