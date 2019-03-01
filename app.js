// require('./db/db-config');
const express = require('express');
const https = require('https');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//routes
const SongAPI = require('./routes/songs-route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/song',SongAPI);

module.exports = app;
