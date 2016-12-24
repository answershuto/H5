'use strict';

let H5Controller = require('../controllers/h5.server.controller');

module.exports = function(app){
	app.route('/')
		.get(function(req,res,next){
			res.sendFile('index.html');
		});

	app.route('/H5/Login')
		.all(H5Controller.login);
}