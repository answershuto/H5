'use strict';

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
		res.json({result: true});
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
			let params = req.body.params || {};console.log(params)

			!params.userName && res.json({result: false, content: '用户名为空'});

			!params.passWord && res.json({result: false, content: '密码为空'});

			!params.eMail && res.json({result: false, content: '邮箱为空'});

			res.json({result: true});
		}
		else{
			res.json({result: false, content: '数据格式有误'});
		}
	}
}