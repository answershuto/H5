'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let config = require('../webpack.config')
let webpack = require('webpack')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = function(){
	console.log('init express..');
	let app = express();

	/*webpack*/
	let compiler = webpack(config)
	app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
	app.use(webpackHotMiddleware(compiler));

	app.set('view engine','ejs');
	app.use(express.static(__dirname+'/../views'));

	app.use(bodyParser.json());

	require('../app/routes/h5.server.routes')(app);

	app.use(function(req, res, next){
		res.status(404);
		try{
			return res.json('No Found!');
		}
		catch(e){
			console.error('404 set header after send.');
		}
	})

	app.use(function(err, req, res, next){
		if (!err) {
			return next();
		};

		res.status(500);
		try{
			return res.json(err.message || "server err");
		}
		catch(e){
			console.error('500 set header after send.')
		}
	});

	return app;
};