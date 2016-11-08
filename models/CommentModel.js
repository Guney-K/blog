var mongo = require("mongoóse");


//Schema Setup
var CommentSchema = new mongo.Schema({
	name: String,
	content: String,
	description: String,
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserModel"

		}
	]
});

//whis states that when you require for this js file it will export its content to the file taht you require it.
module.exports = mongoose.model("camp", campSchema);