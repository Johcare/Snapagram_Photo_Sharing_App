const User = require("../models/user");

function deserializeUserMW(req, res, next) {
	if (req.session.userid) {
		User.findById(req.session.userid)
			.then(function(user) {
				if (user) {
					req.user = user;
				}
				else {
					req.session.userid = null;
				}
				next();
			})
			.catch(function(err) {
				console.error("There was an error with deserializing the user! " + req.session.userid);
				console.error(err);
				next();
			});
	}
	else {
		next();
	}
}

module.exports = deserializeUserMW;