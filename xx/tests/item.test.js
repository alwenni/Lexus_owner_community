const request = require('supertest')
const app = require('../app')
const Item = require('../models/item')
const User = require('../models/user')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

afterEach(async () => {
  await Item.deleteMany({})
  await User.deleteMany({})
})

describe('Item API', () => {
  test('GET /api/items - should get all items', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      location: 'Test City'
    })
    await user.save()

    const item = new Item({
      seller: user._id,
      title: 'Test Item',
      description: 'Test description',
      price: 50,
      category: 'Electronics',
      condition: 'Good',
      location: 'Test City'
    })
    await item.save()

    const response = await request(app)
      .get('/api/items')
      .expect(200)

    expect(response.body).toHaveLength(1)
    expect(response.body[0].title).toBe('Test Item')
  })

  test('POST /api/items - should create new item', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      location: 'Test City'
    })
    await user.save()
    const token = await user.generateAuthToken()

    const itemData = {
      title: 'New Item',
      description: 'New description',
      price: 100,
      category: 'Electronics',
      condition: 'New',
      location: 'Test City'
    }

    const response = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(itemData)
      .expect(201)

    expect(response.body.title).toBe(itemData.title)
    expect(response.body.seller).toBe(user._id.toString())
  })
})