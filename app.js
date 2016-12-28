'use strict';

let express = require('./config/express');
let mongodb = require('./config/mongoose');

let db = mongodb();
let app = express();

module.exports = app;