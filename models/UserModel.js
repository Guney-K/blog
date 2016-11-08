var mongo = require("mongoose");

var UserSchema = new mongo.Schema({
	name: String,
	surname: String,
	image: String,

	comments:[
		type: mongo.Schema.Types.ObjectId,
		ref: "CommentModel"
	]

});


module.exports = mongo.model("UserModel", UserSchema);