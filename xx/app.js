const express = require('express')
const morgan = require('morgan')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const userRoutes = require('./controllers/auth/routeController')
const itemRoutes = require('./controllers/items/routeController')
const apiRoutes = require('./routes/apiRoutes')
const app = express()

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(express.static('public'))
app.use(morgan('dev'))

// Web routes
app.use('/users', userRoutes)
app.use('/items', itemRoutes)
app.use('/cars', require('./controllers/cars/routeController'))

// API routes
app.use('/api', apiRoutes)

// Home route
app.get('/', (req, res) => {
    res.redirect('/items')
})

module.exports = app