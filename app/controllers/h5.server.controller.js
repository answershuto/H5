'use strict';

let mongoose = require('mongoose');
let rpc = require('./h5.server.rpc');
let formidable = require('formidable');
let fs = require('fs');
let cfg = require('../../config/config');
let qr = require('qr-image')

/*mongoose*/
let Users = mongoose.model('Users');
let UserMusics = mongoose.model('UserMusics');
let UserImages = mongoose.model('UserImages');
let UserDesigns = mongoose.model('UserDesigns');

/*产生4位随机数带上时间*/
function RandomKey(){
	function getNum(){
		return Math.ceil(Math.random() * 10) - 1; /*产生0-9的随机数*/
	}

	let Key = "";
	for(let i=0; i<4; i++){
		Key += getNum();
	}

	return (Key + Date.parse(new Date()));
}

module.exports = {

	/**
	 * 用户登陆
	 *
	 * 用户登陆接口，返回是否登陆成功。
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2016-12-27
	 * @author   Cao Yang
	 */
	login(req,res,next){
		let params = req.body.params || {};

		if (!params.userName) {
			res.json({result: false, content: '用户名为空'});
			return;
		}

		if (!params.passWord) {
			res.json({result: false, content: '密码为空'});
			return;
		}

		Users.find({userName:params.userName}, null,{},function(err,result){
			if (err) {
				console.log('login find err!');
				res.json({result: false, content: '登陆失败'});
				return next(err);
			}
			else{
				if (result.length && (result[0].passWord === params.passWord)) {
					req.session.user = {'userName': params.userName};
					console.log('login req.session.user',req.session.user)
					res.json({
						result: true,
						params: {
							userInfo: result[0],
						}
					});
				}
				else if(result.length === 0){
					res.json({result: false, content: '用户不存在'});
				}
				else{
					res.json({result: false, content: '用户名或密码错误，请重试'});
				}
			}
		})

	},

	/**
	 * 用户注册
	 *
	 * 用户注册接口，注册新用户。
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2016-12-27
	 * @author   Cao Yang
	 */
	register(req,res,next){
		if (req.body && req.body.params) {
			let params = req.body.params || {};

			if (!params.userName) {
				res.json({result: false, content: '用户名为空'});
				return;
			}

			if (!params.passWord) {
				res.json({result: false, content: '密码为空'});
				return;
			}
			
			if (!params.eMail) {
				res.json({result: false, content: '邮箱为空'});
				return;
			}

			let user = new Users({
				userName: params.userName,
				passWord: params.passWord,
				eMail: params.eMail,
				nikeName: params.userName,
				userImage: "/image/defaultHeadPortrait.png",
				Gender: 'Man',
				age: '18',
				personalizedSignature: '',
				place: '',
			});

			user.save(function(err){
            	if (err) {
            		console.log('Register err!' + err);
            		res.json({result: false, content: '注册失败'});
            		return next(err);
            	}
            	else{
            		console.log('Register ' + params.userName + ' successed.');
            		res.json({result: true});
            	}
            })
			
		}
		else{
			res.json({result: false, content: '数据格式有误'});
		}
	},

	/**
	 * RPC接口
	 *
	 * 对RPC接口做同一操作。
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-1
	 * @author   Cao Yang
	 */
	rpcMethon(req,res,next){
		let params = req.body.params || {};
		let method = req.body.method;
		if ((typeof rpc[method]) === 'function') {
			rpc[method](req,res,next);
		}
		else{
			res.json({result: false, content: '未找到RPC接口'});
		}
	},

	/**
	 * 上传音乐
	 *
	 * 上传本地音乐文件接口
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-12
	 * @author   Cao Yang
	 */
	 UploadMusic(req, res, next){
	 	let form = new formidable.IncomingForm();
		form.uploadDir = __dirname+'/../../userData/musics';
		form.keepExtensions = true;
		form.maxFieldsSize = 2*1024*1024;/*限制图片大小最大为2M*/

		form.parse(req,(err,fields,files) => {
			if (files.music.type.indexOf('audio') >= 0) {
				let path = files.music.path;
				let newPath = path.slice(0, path.lastIndexOf('/'))+'/'+req.session.user.userName+'-'+RandomKey()+ path.slice(path.lastIndexOf('.'),path.length);
				fs.rename(path, newPath);
				
				/*save in mongoDB*/
				let music = new UserMusics({
					userName: req.session.user.userName,
					path: newPath,
					musicName: files.music.name,
					type: files.music.type,
					size: files.music.size,
				});

				music.save(err => {
					if (err) {
						res.json({result: false, content: '上传音乐失败'});
						return next(err);
					}
					else{
						res.json({result: true});
					}
				})
			}
			else{
				res.json({result: false, content: '音频文件格式有误'});
			}
		})
	 },

	 /**
	 * 播放音乐
	 *
	 * 播放音乐接口
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-16
	 * @author   Cao Yang
	 */
	 PlayMusic(req, res, next){
	 	UserMusics.findById(req.query.id, (err, result) => {
	 		if (result) {
	 			res.writeHead(200, {'Content-Type': 'video/mp4'});  
				let rs = fs.createReadStream(result.path);  

				rs.pipe(res);  
		 		rs.on('end',function(){  
					res.end();  
				});  
	 		}
	 	});
	 },

	 /**
	 * 上传图片
	 *
	 * 上传本地图片文件接口
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-27
	 * @author   Cao Yang
	 */
	 UploadImage(req, res, next){
	 	let form = new formidable.IncomingForm();
		form.uploadDir = __dirname+'/../../userData/images';
		form.encoding = 'utf-8';
		form.keepExtensions = true;
		form.maxFieldsSize = 2*1024*1024;/*限制图片大小最大为2M*/

		form.parse(req,(err,fields,files) => {
			let fileType;
			switch(files.image.type){
				case 'image/jpeg':
					fileType = 'jpeg';
					break;
				case 'image/png':
					fileType = 'png';
					break;
				case 'image/jpg':
					fileType = 'jpg';
					break;
			}

			if (fileType === undefined) {/*上传的图片格式没有按照指定要求*/
				res.send('uploadIcon img type err');
				return;
			};

			let path = files.image.path;
			let newPath = path.slice(0, path.lastIndexOf('/'))+'/'+req.session.user.userName+'-'+RandomKey()+ path.slice(path.lastIndexOf('.'),path.length);
			fs.rename(path, newPath);
			
			/*save in mongoDB*/
			let image = new UserImages({
				userName: req.session.user.userName,
				path: newPath,
				type: files.image.type,
				size: files.image.size,
			});

			image.save(err => {
				if (err) {
					res.json({result: false, content: '上传图片失败'});
					return next(err);
				}
				else{
					res.json({result: true});
				}
			})
		})

	 },

	 /**
	 * 显示图片
	 *
	 * 显示图片接口
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-29
	 * @author   Cao Yang
	 */
	 showImage(req, res, next){
	 	UserImages.findById(req.query.id, (err, result) => {
	 		if (result) {
	 			
	 			res.writeHead(200, {'Content-Type': result.type});  
				let rs = fs.createReadStream(result.path);  

				rs.pipe(res);  
		 		rs.on('end',function(){  
					res.end();  
				});  
	 		}
	 		else{
	 			next();
	 		}
	 	});
	 },

	/**
	 * 显示生成页面
	 *
	 * 显示生成页面接口
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-2-3
	 * @author   Cao Yang
	 */
	 showPage(req, res, next){
	 	UserDesigns.find({userName: req.query.userName, workName: req.query.workName,}, null,{}, (err, result) => {
			if (err) {
				console.log('showPage err!' + err);
        		res.json({result: false, content: '获取页面失败'});
        		return next(err);
			}
			else{
				console.log(result)
				if (result.length) {
					
					res.render("show",{cfg,"designInfos":result[0].designInfos}); 
				}
				else{
					res.send('404 no found.');
				}
			}
		})
	 },

	 /**
	 * 二维码接口
	 *
	 * 根据URL生成对应的二维码图片
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-3-19
	 * @author   Cao Yang
	 */
	 QRcode(req, res, next){
	 		let userName = req.query.userName || '';
	 		let workName = req.query.workName || '';
	 		let url = cfg.ip + ':' + cfg.port + '/H5/Show?userName=' + userName + '&workName=' + workName;
		    try {
		        var img = qr.image(url,{size :10});
		        res.writeHead(200, {'Content-Type': 'image/png'});
		        img.pipe(res);
		    } catch (e) {
		        res.writeHead(414, {'Content-Type': 'text/html'});
		        res.end('<h1>414 Request-URI Too Large</h1>');
		    }
	 }

}