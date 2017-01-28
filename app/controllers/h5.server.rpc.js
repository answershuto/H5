'use strict';

let mongoose = require('mongoose');
let UserMusics = mongoose.model('UserMusics');
let UserImages = mongoose.model('UserImages');
let fs = require('fs');

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
				console.log('getAllUserMusics err!' + err);
        		res.json({result: false, content: '查询失败'});
        		return next(err);
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

	/**
	 * 删除用户音乐
	 *
	 * 删除用户音乐接口
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-14
	 * @author   Cao Yang
	 */
	 delUserMusics(req, res, next){
	 	let szId = req.body.params.id || [];
	 	(typeof szId === 'string') && (szId = [szId]);

	 	szId.forEach(id => {
	 		UserMusics.findById(id, (err, result) => {
	 			if (result.userName === req.session.user.userName) {/*校验用户是否是自己*/
	 				result.remove(err => {
						if (err) {
							console.log('delUserMusics err!' + err);
			        		res.json({result: false, content: '删除失败'});
			        		return next(err);
						}
						else{
							fs.unlinkSync(result.path);
						}
	 				})
	 			}
	 		});
	 	})

	 	res.json({result: true});
	 },

	 /**
	 * 获取所有图片
	 *
	 * 获取用户上传的所有图片的列表
	 *
	 * @param    req 
	 * @param    res 
	 * @param    next 
	 * @returns  void
	 *
	 * @date     2017-1-14
	 * @author   Cao Yang
	 */
	getAllUserImages(req, res, next){
		UserImages.find({userName: req.session.user.userName}, null,{}, (err, result) => {
			if (err) {
				console.log('getAllUserImages err!' + err);
        		res.json({result: false, content: '查询失败'});
        		return next(err);
			}
			else{
				let params = [];
				result.forEach((item, index) => {
					params.push({
						id: item._id,
					})
				})
				res.json({result: true, params});
			}
		})
	},
}






