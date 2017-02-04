'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let config = require('../webpack.config')
let webpack = require('webpack')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')
let session = require('express-session');
let cookieParser = require('cookie-parser');

/*产生128位随机数*/
function RandomSecret(){
	function getNum(){
		return Math.ceil(Math.random() * 10) - 1; /*产生0-9的随机数*/
	}

	let secret = "";
	for(let i=0; i<128; i++){
		secret += getNum();
	}

	return secret;
}

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

	app.use(bodyParser.urlencoded({extended:false}));

	app.use(session({
		resave: false,
		rolling: false,
		saveUninitialized: true,
		secret: RandomSecret(),
		name: 'H5Session',
		cookie: { maxAge: 60 * 1000 * 60}
	}));

	app.use(function(req,res,next){
		console.log(req.url)
		if (!req.session.user) {
			if (req.url === '/H5/Login' 
				|| req.url === '/H5/Register' 
				|| req.url.indexOf('/H5/PlayMusic') >= 0
				|| req.url.indexOf('/H5/image') >= 0
				|| req.url.indexOf('/H5/Show') >= 0) {
				next();/*请求为登陆或者注册则不需要校验session*/
			}
			else{
				res.json({result: false, content: '用户权限异常'});
			}
		}
		else if (req.session.user) {
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