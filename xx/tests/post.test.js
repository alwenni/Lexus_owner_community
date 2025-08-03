const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8081, () => console.log('Testing Posts on PORT 8081'))
const Author = require('../models/author')
const Post = require('../models/post')
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

afterEach(async () => {
  await Author.deleteMany({})
  await Post.deleteMany({})
})

describe('Post API Tests', () => {
  let author, token

  beforeEach(async () => {
    author = new Author({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    })
    await author.save()
    token = await author.generateAuthToken()
  })

  describe('POST /api/posts', () => {
    test('should create new post successfully', async () => {
      const postData = {
        title: 'My First Blog Post',
        content: 'This is the content of my first blog post.',
        published: true
      }

      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postData)
        .expect(201)

      expect(response.body).toHaveProperty('title', postData.title)
      expect(response.body).toHaveProperty('content', postData.content)
      expect(response.body).toHaveProperty('published', postData.published)
    })
  })

  describe('GET /api/posts', () => {
    test('should get all posts for authenticated author', async () => {
      const post = new Post({
        title: 'Test Post',
        content: 'Test content',
        author: author._id
      })
      await post.save()

      author.posts.addToSet(post._id)
      await author.save()

      const response = await request(app)
        .get('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(1)
      expect(response.body[0]).toHaveProperty('title')
    })
  })
})