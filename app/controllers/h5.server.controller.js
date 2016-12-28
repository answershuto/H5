'use strict';

let mongoose = require('mongoose');
let Users = mongoose.model('Users');


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
					req.session.userName = {'userName': params.userName};
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
	}
}