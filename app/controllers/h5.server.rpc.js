'use strict';

module.exports = {
	logout(req,res,next){
		delete req.session.user;
		res.json({result: true});
	},
}