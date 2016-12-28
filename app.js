'use strict';

let express = require('./config/express');
let mongodb = require('./config/mongoose');

let app = express();
let db = mongodb();

module.exports = app;