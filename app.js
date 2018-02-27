'use strict';

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const index = require('./routes/index');
const auth = require('./routes/auth');

const app = express();

// database setup

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/final-project', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// middlewares

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/auth', auth);

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
