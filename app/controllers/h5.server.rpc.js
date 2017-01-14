'use strict';

let mongoose = require('mongoose');
let UserMusics = mongoose.model('UserMusics');

module.exports = {
	/**
	 * 用户登出
	 *
	 * 用户登出接口，释放资源
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-14
	 * @author   Cao Yang
	 */
	logout(req,res,next){
		delete req.session.user;
		res.json({result: true});
	},

	/**
	 * 获取所有音乐
	 *
	 * 获取用户上传的所有音乐的列表
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-14
	 * @author   Cao Yang
	 */
	getAllUserMusics(req, res, next){
		UserMusics.find({userName: req.session.user.userName}, null,{}, (err, result) => {
			if (err) {

			}
			else{
				let params = [];
				result.forEach((item, index) => {
					params.push({
						id: item._id,
						musicName: item.musicName,
					})
				})
				res.json({result: true, params});
			}
		})
	},
}