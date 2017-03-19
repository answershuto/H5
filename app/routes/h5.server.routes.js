'use strict';

let H5Controller = require('../controllers/h5.server.controller');

module.exports = function(app){
	app.route('/')
		.get(function(req,res,next){
			res.sendFile('index.html');
		});

	app.route('/H5/Login')
		.post(H5Controller.login);

	app.route('/H5/Register')
		.post(H5Controller.register);

	app.route('/H5/rpc')
		.post(H5Controller.rpcMethon);

	app.route('/H5/UploadMusic')
		.post(H5Controller.UploadMusic);

	app.route('/H5/UploadImage')
		.post(H5Controller.UploadImage);

	app.route('/H5/PlayMusic')
		.get(H5Controller.PlayMusic);

	app.route('/H5/image')
		.get(H5Controller.showImage);

	app.route('/H5/Show')
		.get(H5Controller.showPage);

	app.route('/H5/QRcode')
		.get(H5Controller.QRcode);
}