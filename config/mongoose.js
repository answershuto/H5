let mongoose = require('mongoose');
let config = require('./config')

module.exports = function(){
	let db = mongoose.connect(config.mongodb);

	require('../app/models/H5.server.model.js');

	return db;
}