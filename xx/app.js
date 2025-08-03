const exporess = require('express');
const morgan = require('morgan');
const jsxEngine = require('jsx-engine');
const methodOverride = require('method-override');
const authorRouter = require('./routes/author');
const postRouter = require('./routes/post');
const apiRouter = require('./routes/api');
const app = exporess();

app.set('view engine', 'jsx');

