'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let config = require('../webpack.config')
let webpack = require('webpack')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')
let session = require('express-session');
let cookieParser = require('cookie-parser');

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

	app.use(cookieParser());

	app.use(session({
		resave: false,
		saveUninitialized: true,
		secret: 'CloudNte',
		name: 'H5session'
	}));

	app.use(function(req,res,next){
		if (!req.session.userName) {
			if (req.url === '/H5/Register' || req.url === '/H5/Login') {
				next();/*请求为登陆或者注册则不需要校验session*/
			};
		}
		else if (req.session.userName) {
			next();
		};
	})

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