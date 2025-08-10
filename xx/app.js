// app.js (clean + DB + env)
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const jsxEngine = require('jsx-view-engine');
const methodOverride = require('method-override');
const path = require('path');

const { connectDB } = require('./config/db');

const userRoutes = require('./controllers/auth/routeController');
const carRoutes  = require('./controllers/cars/routeController');
const apiRoutes  = require('./routes/apiRoutes');

const app = express();

/* -------------------- DB -------------------- */
connectDB();

/* ----------------- View Engine -------------- */
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine());
app.set('views', path.join(__dirname, 'views'));

/* ---------------- Middlewares ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.data = {};
  next();
});
app.use(express.static(path.join(__dirname, 'public'))); // /css/style.css -> public/css/style.css
app.use(morgan('dev'));

/* ------------------- Routes ------------------ */
// Web routes
app.use('/users', userRoutes);
// app.use('/items', itemRoutes);   // إن كنت لا تحتاجه لاحقًا يمكنك إزالته
app.use('/cars',  carRoutes);

// API routes
app.use('/api', apiRoutes);
app.use('/comments', require('./controllers/comments/routeController'));
app.use('/parts', require('./controllers/parts/routeController'));
app.use('/users', require('./controllers/auth/routeController'));




// Home route (وجّهنا للسوق مباشرة)
app.get('/', (req, res) => res.redirect('/cars'));

/* --------------- 404 + Error Handler -------- */
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  if (res.headersSent) return next(err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
