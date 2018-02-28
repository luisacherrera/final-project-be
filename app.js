'use strict';

const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// database setup

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/final-project', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// middlewares

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  app.locals.user = req.session.currentUser;
  next();
});

app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({error: 'not found'});
});

// error handler
app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500).json({error: 'there was an error'});
  }
});

module.exports = app;
