let mongoose = require('mongoose');
let config = require('./config')

module.exports = function(){
	mongoose.Promise = require('bluebird');
	
	let db = mongoose.connect(config.mongodb);

	require('../app/models/H5.server.model.js');

	return db;
}